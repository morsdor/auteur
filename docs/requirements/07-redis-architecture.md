# Auteur AI - Redis Job Queue Architecture

## Overview

Auteur uses **Redis Streams** (Self-hosted on Hetzner VPS) as the lightweight event-driven backbone for job orchestration. This allows for simple, low-cost, and persistent message queuing that fits within the single-node architecture while maintaining horizontal scalability for GPU workers.

- **Simplicity**: No Zookeeper or complex cluster setup
- **Persistence**: AOF (Append Only File) ensures data safety
- **Cost**: $0/mo (runs on existing VPS) vs $100+/mo for managed Kafka
- **Performance**: Extremely fast in-memory operations with async I/O

---

## Stream Structure

We use a single key pattern `jobs:{type}` for streams.

| Stream Key           | Purpose               | Producer         | Consumer Group       | Retention |
| -------------------- | --------------------- | ---------------- | -------------------- | --------- |
| `jobs:requested`     | New job submissions   | Spring Boot API  | `orchestrator-group` | 7 days    |
| `jobs:transcription` | Transcription tasks   | Job Orchestrator | `worker-group`       | 7 days    |
| `jobs:tts`           | Text-to-speech tasks  | Job Orchestrator | `worker-group`       | 7 days    |
| `jobs:lip-sync`      | Lip sync tasks        | Job Orchestrator | `worker-group`       | 7 days    |
| `jobs:video-gen`     | Video generation      | Job Orchestrator | `worker-group`       | 7 days    |
| `jobs:completed`     | Successful results    | Modal Workers    | `handler-group`      | 30 days   |
| `jobs:failed`        | Failed jobs (refunds) | Modal Workers    | `handler-group`      | 30 days   |

---

## Message Schemas (JSON)

Unlike Kafka (Avro), Redis Streams store simple String key-value pairs. We use JSON for the payload.

### Standard Job Envelope

All messages follow this structure in the `payload` field:

```json
{
  "job_id": "uuid-string",
  "user_id": "uuid-string",
  "type": "TRANSCRIPTION",
  "data": {
    "media_url": "https://...",
    "language": "en",
    ... // Job-specific params
  },
  "timestamp": 1700000000000
}
```

---

## Consumer Groups

### Group: `orchestrator-group`

- **Service**: Spring Boot (Java)
- **Stream**: `jobs:requested`
- **Role**: Validates job request and routes to specific job type stream (e.g., `jobs:transcription`).

### Group: `worker-group`

- **Service**: Modal (Python)
- **Streams**: `jobs:transcription`, `jobs:tts`, etc.
- **Role**: Picks up tasks, processes them on GPU, uploads results to R2, and acknowledges (XACK).

### Group: `handler-group`

- **Service**: Spring Boot (Java)
- **Streams**: `jobs:completed`, `jobs:failed`
- **Role**: Updates Postgres status, refunds credits on failure, notifies user via WebSocket.

---

## End-to-End Flow Example: Transcription

```
┌─────────────────────────────────────────────────────────┐
│ 1. USER: Clicks "Generate Transcript"                  │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 2. SPRING BOOT API                                      │
│    a. Deduct credits (Postgres)                         │
│    b. XADD jobs:requested payload='{...}'               │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 3. REDIS STREAM (jobs:requested)                        │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 4. ORCHESTRATOR (Spring Boot)                           │
│    a. XREADGROUP group=orchestrator-group               │
│    b. Route to jobs:transcription                       │
│    c. XADD jobs:transcription payload='{...}'           │
│    d. XACK jobs:requested                               │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 5. MODAL WORKER (Python)                                │
│    a. XREADGROUP group=worker-group                     │
│    b. Process job (Whisper)                             │
│    c. Upload result to R2                               │
│    d. XADD jobs:completed payload='{...}'               │
│    e. XACK jobs:transcription                           │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 6. RESULT HANDLER (Spring Boot)                         │
│    a. XREADGROUP group=handler-group                    │
│    b. Update Postgres (status='completed')              │
│    c. Notify user                                       │
│    d. XACK jobs:completed                               │
└─────────────────────────────────────────────────────────┘
```

---

## Redis Configuration on Hetzner

**docker-compose.yml**:

```yaml
services:
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 2gb --maxmemory-policy noeviction
    ports:
      - '6379:6379'
    volumes:
      - ./redis-data:/data
    restart: always
```

- **Persistence**: `appendonly yes` ensures durability.
- **Memory**: Cap at 2GB, `noeviction` ensures we don't lose queued jobs.

---

## Spring Boot Integration

**Dependencies**:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**Configuration**:

```yaml
spring:
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: 6379
```

---

## Modal (Python) Integration

**Dependencies**:

```python
redis==5.0.1
```

**Worker Example**:

```python
import redis
import json

r = redis.Redis(host=os.environ["REDIS_HOST"], port=6379, decode_responses=True)

while True:
    # Block for 1000ms waiting for new message
    streams = r.xreadgroup("worker-group", "worker-1", {"jobs:transcription": ">"}, count=1, block=1000)

    if not streams:
        continue

    for stream_name, messages in streams:
        for message_id, data in messages:
            try:
                payload = json.loads(data["payload"])
                process_job(payload)

                # Acknowledge
                r.xack("jobs:transcription", "worker-group", message_id)

                # Publish completion
                r.xadd("jobs:completed", {"payload": json.dumps(result)})

            except Exception as e:
                # Handle failure
                pass
```

---

## Monitoring

- **Lag**: `XPENDING` command shows unacknowledged messages.
- **Memory**: `INFO MEMORY` to ensure we stay within limits.
- **CLI**: `redis-cli` or `RedisInsight` for visual inspection.

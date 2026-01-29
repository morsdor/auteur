# Auteur AI - Kafka Architecture

## Overview

Auteur uses **Apache Kafka** (Confluent Cloud) as the central nervous system for job orchestration. This event-driven architecture decouples the API layer from GPU workers, enabling:
- **Scalability**: Add more consumers without changing producers
- **Reliability**: Jobs persist in Kafka if workers are down
- **Async Processing**: API responds immediately, work happens in background
- **Learning**: Industry-standard event streaming platform

---

## Kafka Topics Structure

| Topic Name | Purpose | Producer | Consumer(s) | Retention | Partitions |
|------------|---------|----------|-------------|-----------|------------|
| `jobs.requested` | New job submissions | Spring Boot API | Job Orchestrator | 7 days | 3 |
| `jobs.transcription` | Transcription tasks | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.tts` | Text-to-speech tasks | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.lip-sync` | Lip sync tasks | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.video-generation` | Video generation | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.performance-cloning` | Face animation | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.gaze-redirection` | Eye gaze fix | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.audio-generation` | Ambient audio | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.video-query` | Video Q&A | Job Orchestrator | Modal (Python) | 7 days | 3 |
| `jobs.render` | Cloud FFmpeg render | Job Orchestrator | Spring Boot Worker | 7 days | 3 |
| `jobs.completed` | Successful results | Modal Workers | Spring Boot API | 30 days | 6 |
| `jobs.failed` | Failed jobs (refunds) | Modal Workers | Spring Boot API | 30 days | 6 |
| `jobs.progress` | Progress updates (optional) | Modal Workers | WebSocket Service | 1 day | 3 |
| `analytics.events` | Usage analytics | Spring Boot API | Analytics Pipeline | 90 days | 6 |

---

## Message Schemas (Avro)

### jobs.requested

```json
{
  "namespace": "com.auteur.kafka.events",
  "type": "record",
  "name": "JobRequested",
  "fields": [
    {"name": "job_id", "type": "string"},
    {"name": "user_id", "type": "string"},
    {"name": "type", "type": {
      "type": "enum",
      "name": "JobType",
      "symbols": [
        "TRANSCRIPTION", "TTS", "LIP_SYNC", "VIDEO_GENERATION",
        "PERFORMANCE_CLONING", "GAZE_REDIRECTION", "AUDIO_GENERATION",
        "VIDEO_QUERY", "RENDER"
      ]
    }},
    {"name": "input_params", "type": "string"},  // JSON string
    {"name": "credits_reserved", "type": "int"},
    {"name": "timestamp", "type": "long", "logicalType": "timestamp-millis"}
  ]
}
```

### jobs.transcription (example specific job topic)

```json
{
  "namespace": "com.auteur.kafka.events",
  "type": "record",
  "name": "TranscriptionJob",
  "fields": [
    {"name": "job_id", "type": "string"},
    {"name": "user_id", "type": "string"},
    {"name": "media_url", "type": "string"},  // R2 presigned URL
    {"name": "language", "type": "string", "default": "en"},
    {"name": "speaker_diarization", "type": "boolean", "default": true},
    {"name": "timestamp", "type": "long", "logicalType": "timestamp-millis"}
  ]
}
```

### jobs.completed

```json
{
  "namespace": "com.auteur.kafka.events",
  "type": "record",
  "name": "JobCompleted",
  "fields": [
    {"name": "job_id", "type": "string"},
    {"name": "user_id", "type": "string"},
    {"name": "type", "type": "JobType"},
    {"name": "output_data", "type": "string"},  // JSON string
    {"name": "processing_time_ms", "type": "long"},
    {"name": "timestamp", "type": "long", "logicalType": "timestamp-millis"}
  ]
}
```

### jobs.failed

```json
{
  "namespace": "com.auteur.kafka.events",
  "type": "record",
  "name": "JobFailed",
  "fields": [
    {"name": "job_id", "type": "string"},
    {"name": "user_id", "type": "string"},
    {"name": "type", "type": "JobType"},
    {"name": "error_code", "type": "string"},
    {"name": "error_message", "type": "string"},
    {"name": "retryable", "type": "boolean"},
    {"name": "credits_to_refund", "type": "int"},
    {"name": "timestamp", "type": "long", "logicalType": "timestamp-millis"}
  ]
}
```

---

## Consumer Groups

### Group: `auteur-job-orchestrator`
- **Service**: Spring Boot (Java)
- **Subscribes to**: `jobs.requested`
- **Role**: Routes jobs to specific topic based on type
- **Instances**: 1-3 (for high availability)

### Group: `auteur-transcription-workers`
- **Service**: Modal (Python)
- **Subscribes to**: `jobs.transcription`
- **Role**: Run Whisper + Pyannote, upload to R2, publish completion
- **Instances**: Auto-scaled by Modal (0 to N based on load)

### Group: `auteur-tts-workers`
- **Service**: Modal (Python)
- **Subscribes to**: `jobs.tts`
- **Role**: Run F5-TTS, upload to R2, publish completion
- **Instances**: Auto-scaled

### Group: `auteur-video-gen-workers`
- **Service**: Modal (Python)
- **Subscribes to**: `jobs.video-generation`
- **Role**: Run Wan2.1, upload to R2, publish completion
- **Instances**: Auto-scaled (concurrency limited for A100s)

### Group: `auteur-result-handlers`
- **Service**: Spring Boot (Java)
- **Subscribes to**: `jobs.completed`, `jobs.failed`
- **Role**: Update Postgres job status, refund credits on failure
- **Instances**: 3+ (for throughput)

---

## End-to-End Flow Example: Transcription

```
┌─────────────────────────────────────────────────────────┐
│ 1. USER: Clicks "Generate Transcript" in Electron      │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 2. FRONTEND: POST /jobs/transcription                   │
│    Body: { media_id: "uuid", language: "en" }           │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 3. SPRING BOOT API (@PostMapping)                       │
│    a. Verify JWT, get user_id                           │
│    b. Calculate cost: 5 credits (10 min audio)          │
│    c. Check balance >= 5 credits                        │
│    d. BEGIN TRANSACTION                                 │
│       - Deduct 5 credits from user                      │
│       - Insert job record (status: pending)             │
│       - COMMIT                                           │
│    e. Publish JobRequestedEvent to Kafka                │
│    f. Return { job_id, status: "pending" }              │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 4. KAFKA: jobs.requested topic                          │
│    Partition: hash(user_id) % 3                         │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 5. JOB ORCHESTRATOR (@KafkaListener)                    │
│    a. Read JobRequestedEvent                            │
│    b. Switch on type: TRANSCRIPTION                     │
│    c. Build TranscriptionJobEvent                       │
│       - Generate R2 presigned URL for media file        │
│       - Add job config                                  │
│    d. Publish to jobs.transcription                     │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 6. KAFKA: jobs.transcription topic                      │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 7. MODAL WORKER (Python Kafka consumer)                │
│    a. Poll jobs.transcription                           │
│    b. Modal spins up A10G GPU container                │
│    c. Download media from R2 (presigned URL)            │
│    d. Run Whisper (transcription)                       │
│    e. Run Pyannote (speaker diarization)                │
│    f. Merge results into JSON                           │
│    g. Upload result.json to R2                          │
│    h. Publish JobCompletedEvent to jobs.completed       │
│       - output_data: { result_url, segments_count }     │
│       - processing_time_ms: 45000                       │
│    i. Modal scales down container                       │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 8. KAFKA: jobs.completed topic                          │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 9. RESULT HANDLER (@KafkaListener)                      │
│    a. Read JobCompletedEvent                            │
│    b. UPDATE jobs SET status='completed',               │
│        output_data='{...}', completed_at=NOW()          │
│        WHERE job_id = '...'                             │
│    c. (Optional) WebSocket push to client               │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ 10. CLIENT: Polls GET /jobs/{job_id}                    │
│     Response: { status: "completed", output_data: {...}}│
│     OR receives WebSocket event                         │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling

### Scenario: GPU Out of Memory

```
Modal Worker
    ├─ Catches exception: CUDA OOM
    └─ Publishes JobFailedEvent
        ├─ error_code: "GPU_OOM"
        ├─ error_message: "Insufficient VRAM for 4K video"
        ├─ retryable: false
        └─ credits_to_refund: 15

Result Handler
    ├─ Reads JobFailedEvent
    ├─ UPDATE jobs SET status='failed', error_message=...
    └─ BEGIN TRANSACTION
        ├─ INSERT credit_transactions (type='refund', amount=+15)
        ├─ UPDATE credits SET balance = balance + 15
        └─ COMMIT
```

---

## Confluent Cloud Configuration

### Cluster Setup
- **Region**: us-west-2 (close to GCP VM and Modal GPUs)
- **Type**: Basic (sufficient for learning, upgrade to Standard for SLA)
- **Partitions**: 3 per topic (balance between parallelism and cost)
- **Replication**: 3 (Confluent Cloud default for durability)

### Schema Registry
- **Format**: Avro (compact, evolution-friendly)
- **Compatibility**: BACKWARD (can read old messages with new schema)
- **Auto-register**: Enabled for development, disabled for production

### Security
- **Auth**: SASL/PLAIN with API keys
- **Encryption**: TLS 1.2+ for all connections
- **ACLs**: Separate keys for producers/consumers with topic-level permissions

---

## Spring Boot Integration

### Dependencies (Maven)

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-avro-serializer</artifactId>
    <version>7.5.0</version>
</dependency>
```

### Configuration (application.yml)

```yaml
spring:
  kafka:
    bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS}
    properties:
      security.protocol: SASL_SSL
      sasl.mechanism: PLAIN
      sasl.jaas.config: org.apache.kafka.common.security.plain.PlainLoginModule required username="${KAFKA_API_KEY}" password="${KAFKA_API_SECRET}";
      schema.registry.url: ${KAFKA_SCHEMA_REGISTRY_URL}
      basic.auth.credentials.source: USER_INFO
      basic.auth.user.info: ${SCHEMA_REGISTRY_API_KEY}:${SCHEMA_REGISTRY_API_SECRET}
    
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
      acks: all  # Wait for all replicas
      retries: 3
    
    consumer:
      group-id: auteur-api
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: io.confluent.kafka.serializers.KafkaAvroDeserializer
      auto-offset-reset: earliest
      enable-auto-commit: false  # Manual commit after DB update
```

---

## Modal (Python) Integration

### Dependencies

```python
# requirements.txt
kafka-python==2.0.2
confluent-kafka[avro]==2.3.0
```

### Consumer Example

```python
from confluent_kafka import Consumer
from modal import App, Secret

app = App()

@app.function(
    image=audio_image,
    gpu="A10G",
    secrets=[Secret.from_name("kafka-credentials")],
    timeout=600
)
def transcription_worker():
    consumer = Consumer({
        'bootstrap.servers': os.environ['KAFKA_BOOTSTRAP_SERVERS'],
        'group.id': 'auteur-transcription-workers',
        'security.protocol': 'SASL_SSL',
        'sasl.mechanisms': 'PLAIN',
        'sasl.username': os.environ['KAFKA_API_KEY'],
        'sasl.password': os.environ['KAFKA_API_SECRET'],
    })
    
    consumer.subscribe(['jobs.transcription'])
    
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        
        job = json.loads(msg.value())
        try:
            # Process job
            result = run_whisper_and_pyannote(job)
            
            # Publish completion
            publish_completed(job['job_id'], result)
            
            # Commit offset
            consumer.commit(msg)
        except Exception as e:
            publish_failed(job['job_id'], str(e))
            consumer.commit(msg)
```

---

## Monitoring & Observability

### Metrics to Track
- **Lag**: Consumer lag per topic (should be < 1000 messages)
- **Throughput**: Messages/sec produced and consumed
- **Error Rate**: % of jobs.failed vs jobs.completed
- **Latency**: Time from jobs.requested → jobs.completed

### Tools
- **Confluent Cloud Dashboard**: Built-in metrics
- **Spring Boot Actuator**: `/actuator/metrics/kafka.*`
- **Modal Logs**: View consumer logs in Modal dashboard

---

## Cost Estimation (Confluent Cloud)

**Basic Cluster (us-west-2)**:
- Base: $0.11/hr = ~$80/month
- Storage: $0.10/GB/month (first 10GB free)
- Ingress: Free
- Egress: $0.09/GB

**Estimated Monthly Cost** (1000 jobs/day):
- Cluster: $80
- Storage: ~$10 (100GB retained)
- Egress: ~$20 (3GB/day to Modal + Spring Boot)
- **Total**: ~$110/month

**Note**: This is for learning. Production would use Standard cluster (~$400/month) for SLA.

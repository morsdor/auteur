# Auteur AI - Technical Specifications

## 1. Technology Stack

### 1.1 Monorepo Management

| Tool            | Purpose                            |
| --------------- | ---------------------------------- |
| Turborepo       | Monorepo build system with caching |
| pnpm workspaces | Package management and linking     |
| Changesets      | Version management and changelogs  |

### 1.2 Shared Packages (80% code reuse)

| Package | Technology | Purpose |
|---------|------------|---------||
| `@auteur/ui` | React 18 + shadcn/ui + TypeScript | Shared UI components |
| `@auteur/api-client` | TypeScript + Fetch | REST API client with types |
| `@auteur/types` | TypeScript | Shared type definitions |
| `@auteur/utils` | TypeScript | Business logic (EDL parsing, credit calc) |
| `@auteur/auth` | TypeScript | Auth abstractions (supports Electron & Web) |
| `@auteur/storage` | TypeScript | Storage adapter interface |

### 1.3 Desktop App (apps/desktop) - Platform-Specific

| Layer | Technology | Purpose |
|-------|------------|---------||
| Framework | Electron 28+ | Cross-platform desktop wrapper |
| UI | React 18 from `@auteur/ui` | Shared components |
| Component Library | shadcn/ui | Radix UI + Tailwind primitives |
| State | Zustand | Lightweight state management |
| Server State | React Query (TanStack Query) | API cache and sync |
| Styling | Tailwind CSS | Utility-first styling |
| Build | Vite | Fast bundling |
| IPC | Electron ContextBridge | Secure main/renderer comm |
| Storage | electron-store | Encrypted local storage |
| Auth | Supabase JS + electron-store | OAuth + JWT with local persistence |

**Specialized Libraries:**
| Library | Purpose |
|---------|---------||
| `dnd-kit` | Drag-and-drop for timeline clips (performance-first) |
| `@tanstack/react-virtual` | Virtualized timeline rendering (handle 1000s of clips) |
| `react-resizable-panels` | VS Code-style panel resizing |
| `tiptap` | Rich text editor linked to video timestamps |
| `lucide-react` | Sharp, clean icons |

### 1.4 Web App (apps/web) - Platform-Specific

| Layer | Technology | Purpose |
|-------|------------|---------||
| Framework | Next.js 14 (App Router) | React framework with SSR |
| UI | React 18 from `@auteur/ui` | Shared components |
| Component Library | shadcn/ui | Radix UI + Tailwind (same as desktop) |
| State | Zustand | State management (same as desktop) |
| Server State | React Query (TanStack Query) | API cache and sync (same patterns) |
| Styling | Tailwind CSS | Utility-first styling (shared config) |
| Build | Next.js built-in | Optimized production builds |
| Storage | IndexedDB (via Dexie) | Client-side database |
| Auth | Supabase JS | OAuth + JWT with browser storage |
| PWA | next-pwa | Progressive Web App support |

**Specialized Libraries** (same as desktop for consistency):
| Library | Purpose |
|---------|---------||
| `dnd-kit` | Drag-and-drop for timeline clips |
| `@tanstack/react-virtual` | Virtualized timeline rendering |
| `react-resizable-panels` | VS Code-style panel resizing |
| `tiptap` | Rich text editor linked to video timestamps |
| `lucide-react` | Sharp, clean icons |

### 1.5 API Layer (Spring Boot on GCP Compute Engine)

| Layer | Technology | Purpose |
|-------|------------|---------||
| Runtime | Java 21 LTS | Modern Java with virtual threads |
| Framework | Spring Boot 3.2 | Enterprise Java framework |
| API | Spring Web | REST API with @RestController |
| Validation | Jakarta Validation | Request/response validation |
| Auth | Spring Security + Supabase JWT | Token verification |
| Queue Producer | Spring Kafka | Kafka message publishing |
| Queue Consumer | @KafkaListener | Kafka message consumption |
| Migrations | Flyway | Database schema versioning |
| Logging | Logback + Cloud Logging | Structured logging |
| Metrics | Micrometer + Actuator | Prometheus metrics |
| Testing | JUnit 5 + Mockito + TestContainers | Unit and integration tests |
| Build | Maven | Dependency management |
| Hosting | GCP Compute Engine (e2-medium) | Free tier VM |

### 1.6 Message Queue (Apache Kafka - Confluent Cloud)

| Layer           | Technology                              | Purpose                                                                    |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Platform        | Confluent Cloud (AWS us-west-2)         | Managed Kafka cluster                                                      |
| Cluster Type    | Basic                                   | Learning/development tier                                                  |
| Serialization   | Avro                                    | Compact, schema-evolution friendly                                         |
| Schema Registry | Confluent Schema Registry               | Avro schema management                                                     |
| Producers       | Spring Kafka (Java)                     | API publishes job events                                                   |
| Consumers       | Spring Kafka + confluent-kafka (Python) | Job orchestration + Modal workers                                          |
| Topics          | 14 topics                               | jobs._, analytics._ (see [Kafka Architecture](./07-kafka-architecture.md)) |
| Partitions      | 3 per topic                             | Balance parallelism and cost                                               |
| Retention       | 7-90 days                               | Based on topic type                                                        |

### 1.7 GPU Compute (Modal)

| Layer    | Technology                | Purpose             |
| -------- | ------------------------- | ------------------- |
| Platform | Modal                     | Serverless GPU      |
| Runtime  | Python 3.10               | Model inference     |
| ML       | PyTorch 2.x + CUDA 12     | Deep learning       |
| Models   | Hugging Face Transformers | Model loading       |
| Storage  | modal.Volume              | Model weights cache |

### 1.4 Database (Supabase)

| Layer    | Technology        | Purpose                       |
| -------- | ----------------- | ----------------------------- |
| Auth     | Supabase Auth     | User authentication           |
| SQL      | PostgreSQL 15     | Relational data               |
| Realtime | Supabase Realtime | Live updates                  |
| Storage  | Supabase Storage  | Small file storage (optional) |

### 1.5 Document Store (MongoDB Atlas)

| Layer    | Technology    | Purpose             |
| -------- | ------------- | ------------------- |
| Database | MongoDB 7.x   | Document storage    |
| Driver   | Motor (async) | Python async driver |
| Use Case | EDL storage   | Edit decision lists |

### 1.6 File Storage (Cloudflare R2)

| Layer   | Technology        | Purpose                      |
| ------- | ----------------- | ---------------------------- |
| Storage | Cloudflare R2     | S3-compatible object storage |
| SDK     | boto3 (S3 compat) | Upload/download              |
| CDN     | Cloudflare CDN    | Asset delivery               |

---

## 2. Database Schema (PostgreSQL)

### 2.1 Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 Subscriptions Table

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan VARCHAR(50) NOT NULL, -- 'starter', 'pro'
    status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'expired'
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 Credits Table

```sql
CREATE TABLE credits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    balance INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.4 Credit Transactions Table

```sql
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- positive = add, negative = deduct
    balance_after INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'subscription', 'usage', 'refund', 'bonus'
    description TEXT,
    job_id UUID, -- reference to job if usage
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.5 Projects Table

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    resolution VARCHAR(20) DEFAULT '1920x1080',
    frame_rate DECIMAL(5,2) DEFAULT 30.00,
    edl_id VARCHAR(255), -- MongoDB document ID
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.6 Media Files Table

```sql
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'video', 'audio', 'image'
    mime_type VARCHAR(100),
    duration_ms INTEGER,
    file_size_bytes BIGINT,
    r2_key TEXT NOT NULL, -- Cloudflare R2 object key
    r2_url TEXT NOT NULL,
    thumbnail_r2_key TEXT,
    metadata JSONB, -- width, height, codec, etc.
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.7 Voice Clones Table

```sql
CREATE TABLE voice_clones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sample_r2_key TEXT NOT NULL,
    sample_duration_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.8 Jobs Table

```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL, -- 'transcription', 'tts', 'lip_sync', etc.
    status VARCHAR(50) NOT NULL, -- 'pending', 'processing', 'completed', 'failed'
    credits_cost INTEGER NOT NULL,
    credits_refunded BOOLEAN DEFAULT FALSE,
    input_params JSONB,
    output_data JSONB,
    error_message TEXT,
    modal_task_id VARCHAR(255),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. MongoDB Schema (EDL)

### 3.1 Edit Decision List Document

```javascript
{
  "_id": ObjectId,
  "project_id": "uuid-string", // matches Postgres project.id
  "version": 1,
  "created_at": ISODate,
  "updated_at": ISODate,

  "settings": {
    "resolution": { "width": 1920, "height": 1080 },
    "frame_rate": 30,
    "duration_ms": 120000
  },

  "tracks": [
    {
      "id": "track-uuid",
      "type": "video", // or "audio"
      "name": "Video 1",
      "clips": [
        {
          "id": "clip-uuid",
          "media_file_id": "uuid", // references Postgres media_files.id
          "track_id": "track-uuid",
          "start_ms": 0,        // position on timeline
          "duration_ms": 5000,  // length on timeline
          "in_point_ms": 1000,  // source start trim
          "out_point_ms": 6000, // source end trim
          "effects": [],
          "deleted": false
        }
      ]
    }
  ],

  "transcript": {
    "generated_at": ISODate,
    "segments": [
      {
        "id": "segment-uuid",
        "speaker": "Speaker 1",
        "start_ms": 0,
        "end_ms": 3500,
        "text": "Hello world",
        "words": [
          { "word": "Hello", "start_ms": 0, "end_ms": 500, "confidence": 0.98 },
          { "word": "world", "start_ms": 550, "end_ms": 1000, "confidence": 0.95 }
        ],
        "deleted": false,
        "edited_text": null
      }
    ]
  },

  "undo_stack": [],
  "redo_stack": []
}
```

---

## 4. API Specifications

### 4.1 Authentication Endpoints

#### POST /auth/verify

Verify Supabase JWT token

```
Headers: Authorization: Bearer <jwt>
Response: { "valid": true, "user_id": "uuid" }
```

### 4.2 User Endpoints

#### GET /users/me

Get current user profile

```
Response: {
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "subscription": { "plan": "pro", "status": "active" },
  "credits": { "balance": 1500 }
}
```

### 4.3 Project Endpoints

#### GET /projects

List user's projects

```
Response: { "projects": [...] }
```

#### POST /projects

Create new project

```
Body: { "name": "My Project", "resolution": "1920x1080" }
Response: { "id": "uuid", "name": "My Project", ... }
```

#### GET /projects/:id

Get project details

```
Response: { "id": "uuid", "name": "...", "edl": {...} }
```

#### PUT /projects/:id

Update project

```
Body: { "name": "New Name" }
```

#### DELETE /projects/:id

Delete project

### 4.4 Media Endpoints

#### POST /projects/:id/media/upload-url

Get presigned upload URL for R2

```
Body: { "filename": "video.mp4", "content_type": "video/mp4" }
Response: { "upload_url": "https://...", "media_id": "uuid" }
```

#### POST /projects/:id/media/:media_id/confirm

Confirm upload complete

```
Response: { "media": {...} }
```

#### DELETE /projects/:id/media/:media_id

Delete media file

### 4.5 Job Endpoints

#### POST /jobs/transcription

Start transcription job

```
Body: { "project_id": "uuid", "media_id": "uuid" }
Response: { "job_id": "uuid", "status": "pending", "credits_cost": 5 }
```

#### POST /jobs/tts

Start TTS generation

```
Body: { "text": "Hello world", "voice_id": "uuid", "speed": 1.0 }
Response: { "job_id": "uuid", "status": "pending", "credits_cost": 2 }
```

#### POST /jobs/lip-sync

Start lip sync job

```
Body: { "video_media_id": "uuid", "audio_media_id": "uuid" }
Response: { "job_id": "uuid", "status": "pending", "credits_cost": 15 }
```

#### POST /jobs/video-generation

Start video generation (Pro only)

```
Body: { "prompt": "A cat walking on the moon", "duration_sec": 5 }
Response: { "job_id": "uuid", "status": "pending", "credits_cost": 50 }
```

#### GET /jobs/:id

Get job status

```
Response: {
  "id": "uuid",
  "type": "transcription",
  "status": "completed",
  "output_data": { "transcript": {...} }
}
```

### 4.6 Credit Endpoints

#### GET /credits

Get credit balance

```
Response: { "balance": 1500 }
```

#### GET /credits/history

Get credit transaction history

```
Response: { "transactions": [...] }
```

---

## 5. Modal Function Specifications

### 5.1 Transcription Function

```python
@app.function(
    image=audio_image,
    gpu="A10G",
    timeout=600,
    volumes={"/models": models_vol}
)
def transcribe(audio_url: str) -> dict:
    # Download audio from R2
    # Run Whisper + Pyannote
    # Return transcript with speakers
    pass
```

### 5.2 TTS Function

```python
@app.function(
    image=audio_image,
    gpu="L4",
    timeout=120,
    volumes={"/models": models_vol}
)
def generate_speech(text: str, voice_sample_url: str, speed: float) -> str:
    # Download voice sample
    # Run F5-TTS
    # Upload result to R2
    # Return R2 URL
    pass
```

### 5.3 Lip Sync Function

```python
@app.function(
    image=vision_image,
    gpu="A10G",
    timeout=600,
    volumes={"/models": models_vol}
)
def lip_sync(video_url: str, audio_url: str) -> str:
    # Download video and audio
    # Run MuseTalk with MediaPipe face detection
    # Run GFPGAN upscaling
    # Upload result to R2
    # Return R2 URL
    pass
```

### 5.4 Video Generation Function

```python
@app.function(
    image=vision_image,
    gpu="A100-80GB",
    timeout=900,
    volumes={"/models": models_vol},
    concurrency_limit=10
)
def generate_video(prompt: str, duration_sec: int) -> str:
    # Run Wan2.1-T2V-14B
    # Upload result to R2
    # Return R2 URL
    pass
```

---

## 6. Security Requirements

### 6.1 Electron Security (Desktop App)

- [ ] `nodeIntegration: false` in all BrowserWindows
- [ ] `contextIsolation: true` enforced
- [ ] ContextBridge with typed API only
- [ ] CSP headers: `script-src 'self'`
- [ ] No `shell.openExternal` on untrusted URLs
- [ ] No `eval()` or `new Function()`
- [ ] Disable `webSecurity` only in dev mode
- [ ] Intercept `will-navigate` and `new-window`

### 6.2 Web Security (Web App)

- [ ] Strict CSP headers: `script-src 'self'; object-src 'none'`
- [ ] HTTPS only with HSTS headers
- [ ] SameSite cookies for session management
- [ ] No inline scripts (use nonce for Next.js scripts)
- [ ] XSS protection via React's built-in escaping
- [ ] CORS configured for API domain only
- [ ] Rate limiting on clientside API calls

### 6.3 API Security

- [ ] JWT verification on all endpoints
- [ ] Rate limiting: 100 req/min per user
- [ ] Input validation with Pydantic
- [ ] CORS restricted to both Electron and web origins
- [ ] HTTPS only (Cloud Run default)
- [ ] Secrets in Secret Manager, not env vars

### 6.4 Data Security

- [ ] R2 presigned URLs expire in 15 minutes
- [ ] User can only access own projects/media
- [ ] RLS policies in Supabase Postgres
- [ ] MongoDB queries scoped by user_id
- [ ] No PII in logs

---

## 7. Infrastructure Requirements

### 7.1 GCP Compute Engine (Spring Boot API)

- **Instance Type**: e2-medium (2 vCPU, 4GB RAM)
- **OS**: Ubuntu 22.04 LTS
- **Disk**: 20GB SSD persistent disk
- **Network**: External IP with firewall rules (allow 443, 80)
- **Java**: OpenJDK 21
- **Deployment**: systemd service with auto-restart
- **SSL**: Let's Encrypt via Certbot
- **Monitoring**: Cloud Logging + custom metrics
- **Autoscaling**: Manual (upgrade to e2-standard-2 if needed)

### 7.2 Kafka (Confluent Cloud)

- **Cluster**: Basic (us-west-2)
- **Partitions**: 3 per topic (42 total for 14 topics)
- **Replication**: 3 (Confluent Cloud default)
- **Retention**: 7 days (jobs._), 30 days (jobs.completed/failed), 90 days (analytics._)
- **Throughput**: ~100 messages/sec (baseline for learning)
- **Schema Registry**: Enabled with Avro schemas

### 7.3 Modal

- A100-80GB: max 10 concurrent (video generation)
- A10G: max 50 concurrent (transcription, lip sync, etc.)
- L4/T4: max 100 concurrent (TTS, audio generation)
- Volume size: 100GB for model weights cache

### 7.4 Supabase

- Plan: Pro (for production)
- Database size: 8GB initial
- Auth: Email + Google + GitHub

### 7.5 MongoDB Atlas

- Cluster: M10 (for production)
- Storage: 10GB initial
- Region: us-west-2 (same as Kafka)

### 7.6 Cloudflare R2

- Storage class: Standard
- Lifecycle: Delete after 90 days (optional for temp files)
- CDN: Enabled for fast delivery

### 7.7 CI/CD (GitHub Actions)

- **Workflows**:
  - `ci-frontend.yml`: Lint, typecheck, test for monorepo
  - `ci-backend.yml`: Maven test, build JAR for Spring Boot
  - `deploy-api.yml`: Deploy JAR to GCP VM via SSH
  - `deploy-modal.yml`: Deploy Modal functions
- **Secrets**: Stored in GitHub Secrets (KAFKA_API_KEY, GCP_SSH_KEY, etc.)
- **Artifacts**: JAR files, Docker images (if containerizing later)

### 7.8 Development Tools

- **IDE**: IntelliJ IDEA (Java), VS Code (TypeScript/React)
- **API Testing**: Postman or Bruno
- **Kafka UI**: Confluent Cloud Dashboard + kcat (CLI)
- **Database Tools**: DBeaver (Postgres), MongoDB Compass

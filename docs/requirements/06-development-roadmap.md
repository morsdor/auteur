# Auteur AI - Development Roadmap

## Phase 1: Foundation (Weeks 1-5)
**Goal:** Monorepo + Spring Boot API + Kafka + Authentication

### Milestone 1.0: Monorepo Setup
- [ ] INFRA-0: Monorepo structure (Turborepo + pnpm)
- [ ] INFRA-0.1: Create shared packages (types, utils, api-client, auth, storage)
- [ ] INFRA-0.2: Create `@auteur/ui` package with shadcn/ui
  - [ ] Setup Tailwind CSS shared config
  - [ ] Install shadcn/ui components
  - [ ] Create wrapper components
- [ ] INFRA-0.3: Setup Next.js web app skeleton
- [ ] INFRA-0.4: Setup Electron desktop app skeleton
- [ ] INFRA-0.5: Development scripts and Turborepo pipeline

### Milestone 1.1: Backend Infrastructure
- [ ] INFRA-1: Spring Boot API setup
  - [ ] Initialize Maven project (Java 21)
  - [ ] Configure Spring Boot 3.2 + Spring Web
  - [ ] Setup project structure (controller, service, repository layers)
  - [ ] Configure Logback logging
  - [ ] Add health check endpoint
- [ ] INFRA-2: Deploy to GCP Compute Engine
  - [ ] Create e2-medium VM instance
  - [ ] Install Java 21 on VM
  - [ ] Setup systemd service
  - [ ] Configure SSL with Let's Encrypt
- [ ] INFRA-3: Kafka (Confluent Cloud) setup
  - [ ] Create Confluent Cloud account
  - [ ] Create Basic cluster (us-west-2)
  - [ ] Create initial topics (jobs.requested, jobs.completed, jobs.failed)
  - [ ] Configure Schema Registry
  - [ ] Add Spring Kafka dependencies
  - [ ] Configure Kafka producers/consumers in Spring Boot
- [ ] INFRA-4: Supabase setup (Auth + Postgres)
- [ ] INFRA-5: Cloudflare R2 setup

### Milestone 1.2: Authentication (Both Platforms)
- [ ] US-1.1: User registration (desktop + web)
- [ ] US-1.2: User login (desktop + web)
- [ ] US-1.3: User logout (desktop + web)
- [ ] US-1.4: Password reset
- [ ] US-1.5: View profile

---

## Phase 2: Core Editor (Weeks 6-8)
**Goal:** Project management + Timeline with specialized libraries

### Milestone 2.1: Project Management
- [ ] US-3.1: Create project
- [ ] US-3.2: Import media (with R2 presigned URLs from Spring Boot)
- [ ] US-3.3: Media library
- [ ] US-3.4: Save project
- [ ] US-3.5: Open project
- [ ] INFRA-6: MongoDB setup for EDL storage

### Milestone 2.2: Timeline UI (with specialized libraries)
- [ ] Setup` @tanstack/react-virtual` for virtualized rendering
- [ ] Implement drag-and-drop with `dnd-kit`
- [ ] Add resizable panels with `react-resizable-panels`
- [ ] US-4.1: View timeline
- [ ] US-4.2: Add clips
- [ ] US-4.3: Trim clips
- [ ] US-4.4: Split clips
- [ ] US-4.5: Delete clips
- [ ] US-4.6: Move clips
- [ ] US-4.7: Undo/redo

### Milestone 2.3: Preview
- [ ] US-5.1: Playback (HTML5 video)
- [ ] US-5.2: Scrub timeline
- [ ] US-5.3: Fullscreen mode

---

## Phase 3: Billing (Week 9)
**Goal:** Subscription and credits

- [ ] INFRA-7: Stripe integration in Spring Boot
- [ ] US-2.1: View subscription plans
- [ ] US-2.2: Purchase subscription (Stripe Checkout)
- [ ] US-2.3: View credit balance
- [ ] US-2.4: Usage history
- [ ] US-2.5: Credit deduction (transactional)

---

## Phase 4: First AI Features (Weeks 10-12)
**Goal:** Transcription and TTS via Kafka + Modal

### Milestone 4.1: Modal + Kafka Integration
- [ ] Setup Modal GPU environment (A10G for transcription)
- [ ] Create Modal Kafka consumers (confluent-kafka Python)
- [ ] Download Whisper + Pyannote models to Modal volume
- [ ] Download F5-TTS models to Modal volume
- [ ] Test end-to-end Kafka flow: Spring Boot → Kafka → Modal → Kafka → Spring Boot

### Milestone 4.2: Transcription (via Kafka)
- [ ] Spring Boot: POST /jobs/transcription endpoint
- [ ] Publish JobRequestedEvent to Kafka
- [ ] Job Orchestrator: Route to jobs.transcription
- [ ] Modal worker: Run Whisper + Pyannote, upload to R2
- [ ] Modal worker: Publish JobCompletedEvent
- [ ] Spring Boot consumer: Update job status in Postgres
- [ ] US-6.1: Generate transcript
- [ ] US-6.2: View transcript
- [ ] US-6.3: Edit transcript with Tiptap editor (link words to timeline)
- [ ] US-6.4: Export transcript

### Milestone 4.3: TTS (via Kafka)
- [ ] Similar Kafka flow for TTS jobs
- [ ] US-7.1: Clone voice (upload sample)
- [ ] US-7.2: Generate speech from text

---

## Phase 5: Visual AI Features (Weeks 11-14)
**Goal:** Lip sync and performance cloning

### Milestone 5.1: Lip Sync
- [ ] Download MuseTalk + GFPGAN models
- [ ] US-8.1: Sync lips to audio
- [ ] US-8.2: Auto lip-sync chain
- [ ] US-7.3: Replace dialogue with TTS

### Milestone 5.2: Performance Cloning
- [ ] Download LivePortrait models
- [ ] US-9.1: Animate portrait
- [ ] US-9.2: Webcam recording

---

## Phase 6: Pro Features (Weeks 15-18)
**Goal:** Advanced AI features (Pro plan)

### Milestone 6.1: Video Generation
- [ ] Download Wan2.1 model
- [ ] US-14.1: Text-to-video
- [ ] US-14.2: Image-to-video

### Milestone 6.2: Gaze & Vision
- [ ] US-10.1: Gaze redirection
- [ ] Download Qwen2.5-VL model
- [ ] US-11.1: Query video
- [ ] US-11.2: Find moments

### Milestone 6.3: Audio & LLM
- [ ] Download AudioLDM-2 model
- [ ] US-12.1: Generate ambient
- [ ] US-12.2: Extend audio
- [ ] Setup Llama-3 via vLLM
- [ ] US-13.1: Script help
- [ ] US-13.2: Prompt enhancement

---

## Phase 7: Polish & Production (Weeks 19-20)
**Goal:** Cloud render, CI/CD with GitHub Actions, testing, optimization

- [ ] US-15.1: Cloud render (FFmpeg on Spring Boot worker or Modal)
- [ ] US-15.2: Preview render
- [ ] INFRA-8: GitHub Actions CI/CD
  - [ ] Frontend: Lint, typecheck, build (Electron + Next.js)
  - [ ] Backend: Maven test, build JAR, deploy to GCP VM
  - [ ] Modal: Deploy GPU functions
- [ ] Security audit (OWASP, dependency scanning)
- [ ] Performance optimization (virtualization, lazy loading)
- [ ] E2E tests with Playwright (both desktop and web)
- [ ] Documentation (README, API docs, architecture diagrams)

---

## Recommended Starting Point

For learning purposes, start with:

1. **Week 1**: INFRA-0 (Monorepo setup with Turborepo + pnpm)
2. **Week 2**: INFRA-0.1 + INFRA-0.2 (Shared packages + shadcn/ui components)
3. **Week 3**: INFRA-0.3 + INFRA-0.4 (Next.js + Electron skeletons)
4. **Week 4**: INFRA-1 (Spring Boot) + INFRA-2 (GCP VM deployment)
5. **Week 5**: INFRA-3 (Kafka) + INFRA-4 (Supabase) + INFRA-5 (R2) + Authentication
6. **Week 6**: INFRA-6 (MongoDB) + Project management
7. **Week 7-8**: Timeline with dnd-kit + react-virtual + tiptap
8. **Week 9**: Billing (Stripe)
9. **Week 10-12**: Modal + Kafka integration + Transcription + TTS

This gives you exposure to:
- **Monorepo architecture** with Turborepo
- **Desktop vs Web** development (Electron + Next.js)
- **Enterprise Java** with Spring Boot 3.2
- **Event-driven architecture** with Kafka (Confluent Cloud)
- **Serverless GPUs** with Modal
- **Modern React** with shadcn/ui, dnd-kit, react-virtual, Tiptap
- **Full-stack integration** (TypeScript frontend ↔ Java backend ↔ Python GPU workers)
- **Cloud infrastructure** (GCP VM, Supabase, MongoDB, R2)

This gives you exposure to:
- **Monorepo architecture** and code sharing
- **Desktop app development** (Electron)
- **Web app development** (Next.js)
- **Authentication flows** (multi-platform)
- **REST API design**
- **Serverless GPU computing**
- **File storage patterns**
- **Job queue patterns**

### Platform Testing Strategy

Test features on **both platforms** as you build:
- Implement core logic in shared packages
- Test desktop-specific integration
- Test web-specific integration
- Ensure feature parity (where possible)

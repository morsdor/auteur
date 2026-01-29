# Auteur AI - Development Roadmap (Sequential)

> **Learning-Optimized Path**: Build features in order of complexity, from simple to advanced. Each phase builds on the previous. Do not skip ahead unless blocked.

---

## Phase 1: Foundation (Weeks 1-5)

**Goal**: Set up monorepo, backend API, authentication, and cloud infrastructure

### Week 1: Monorepo Setup
**Milestone**: INFRA-0

- [ ] Initialize Turborepo with pnpm workspaces
- [ ] Configure shared ESLint, Prettier, TypeScript configs
- [ ] Setup Turbo pipeline for build, lint, typecheck
- [ ] Create workspace structure:
  - `apps/web` (Next.js)
  - `apps/desktop` (Electron)
  - `apps/api` (Spring Boot - placeholder)
  - `packages/ui`, `packages/types`, `packages/utils`, `packages/api-client`

**No user stories - pure infrastructure**

---

### Week 2: Shared Packages
**Milestone**: INFRA-0.1, INFRA-0.2

- [ ] **@auteur/types** - TypeScript definitions
  - User types (referenced by US-1.1, US-1.2, US-1.5)
  - Project types (referenced by US-3.1, US-3.4, US-3.5)
  - Subscription types (referenced by US-2.1, US-2.2, US-2.3)
  - EDL types (referenced by US-4.1, US-4.2)
- [ ] **@auteur/utils** - Business logic utilities
  - Validation helpers (referenced by US-1.1)
  - Date/time formatters (referenced by US-2.3, US-2.4)
- [ ] **@auteur/ui** - shadcn/ui component library
  - Install shadcn/ui CLI
  - Add base components: Button, Input, Card, Dialog
  - Setup Tailwind CSS with design tokens

**Referenced by**: All future UI user stories

---

### Week 3: App Skeletons
**Milestone**: INFRA-0.3, INFRA-0.4

- [ ] **Next.js Web App** (apps/web)
  - Setup Next.js 14 with App Router
  - Configure Tailwind + shadcn/ui
  - Create layout with header/sidebar placeholders
  - Test build and dev server
- [ ] **Electron Desktop App** (apps/desktop)
  - Setup Electron with React + Vite
  - Configure ContextBridge for security
  - Setup electron-store for local storage
  - Test app launch and IPC

**Referenced by**: US-1.2 (Login), US-3.1 (Projects), all future features

---

### Week 4: Backend API Setup
**Milestone**: INFRA-1, INFRA-2

- [ ] **Spring Boot API** (Java 21)
  - Initialize Spring Boot 3.2 project with Maven
  - Setup Controllers, Services, Repositories pattern
  - Configure application.yml (dev, prod profiles)
  - Add Lombok, validation dependencies
  - Create health check endpoint: GET /health
- [ ] **Deploy to GCP Compute Engine**
  - Create e2-medium VM instance
  - Install Java 21, Maven
  - Setup systemd service for Spring Boot
  - Configure firewall rules (port 8080)
  - Test deployment with health check

**Referenced by**: All backend user stories (US-1.1 onwards)

---

### Week 5: Infrastructure - Database, Storage, Kafka
**Milestone**: INFRA-3, INFRA-4, INFRA-5, INFRA-6

- [ ] **Supabase** (Postgres + Auth)
  - Create Supabase project
  - Setup database tables (see Week 5 schema below)
  - Configure Row Level Security (RLS)
  - Generate API keys for dev/prod
- [ ] **MongoDB Atlas** (EDL storage)
  - Create cluster (M0 free tier for dev)
  - Create database: `auteur`
  - Create collections: `edls`, `transcripts`
- [ ] **Cloudflare R2** (File storage)
  - Create R2 bucket: `auteur-media`
  - Generate access keys
  - Test upload/download with SDK
- [ ] **Confluent Cloud** (Kafka)
  - Create Basic cluster (us-west-2)
  - Create topics: `jobs.requested`, `jobs.completed`, `jobs.failed`
  - Generate API keys
  - Test connection from Spring Boot

**Database Schema** (for US-1.x, US-2.x, US-3.x):
```sql
-- users (Supabase Auth manages this)
-- subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan VARCHAR(20), -- 'starter', 'pro'
  status VARCHAR(20), -- 'active', 'cancelled'
  credits_remaining INT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(255),
  settings JSONB, -- resolution, framerate
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- media_files
CREATE TABLE media_files (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  name VARCHAR(255),
  type VARCHAR(50), -- 'video', 'audio', 'image'
  storage_url TEXT, -- R2 URL
  duration_sec FLOAT,
  created_at TIMESTAMPTZ
);
```

---

## Phase 2: Authentication & Projects (Weeks 6-7)

**Goal**: Users can sign up, log in, and manage projects

### Week 6: Authentication
**Milestone**: Epic 1 (US-1.1 to US-1.5)

- [ ] **US-1.1: User Registration**
  - Spring Boot: POST /auth/register endpoint
  - Integrate Supabase Auth SDK
  - Frontend: Registration form (email/password)
  - Email verification flow
- [ ] **US-1.2: User Login**
  - Spring Boot: POST /auth/login endpoint
  - JWT token generation and validation
  - Store token in electron-store (desktop) / httpOnly cookie (web)
  - Frontend: Login form with OAuth buttons
- [ ] **US-1.3: User Logout**
  - Clear JWT token from storage
  - Redirect to login screen
- [ ] **US-1.4: Password Reset**
  - Use Supabase password reset flow
  - Frontend: "Forgot password" link
- [ ] **US-1.5: View Account Profile**
  - Spring Boot: GET /users/me endpoint
  - Frontend: Profile page showing email, plan, credits

---

### Week 7: Project Management
**Milestone**: Epic 3 (US-3.1 to US-3.6)

- [ ] **US-3.1: Create New Project**
  - Spring Boot: POST /projects endpoint
  - Frontend: "New Project" dialog (name, resolution, framerate)
  - Initialize empty EDL in MongoDB
- [ ] **US-3.2: Import Media Files**
  - Spring Boot: POST /projects/{id}/media endpoint
  - Upload to Cloudflare R2
  - Generate thumbnails with FFmpeg (server-side)
  - Store metadata in Postgres
- [ ] **US-3.3: View Project Media Library**
  - Spring Boot: GET /projects/{id}/media endpoint
  - Frontend: Media library panel with grid view
- [ ] **US-3.4: Save Project**
  - Auto-save every 30 seconds
  - PUT /projects/{id} endpoint
  - Update EDL in MongoDB
- [ ] **US-3.5: Open Existing Project**
  - GET /projects endpoint (list)
  - GET /projects/{id} endpoint (details)
  - Load EDL from MongoDB
  - Frontend: Dashboard with project cards
- [ ] **US-3.6: Delete Project**
  - DELETE /projects/{id} endpoint
  - Delete media from R2
  - Delete EDL from MongoDB

---

## Phase 3: Timeline Editor (Weeks 8-9)

**Goal**: Build a functional video timeline with drag-and-drop

### Week 8: Timeline Basics
**Milestone**: Epic 4 Part 1 (US-4.1 to US-4.4)

- [ ] **US-4.1: View Timeline**
  - Frontend: Timeline component with dnd-kit
  - Time ruler with zoom (1x, 2x, 5x, 10x)
  - Multiple tracks (video, audio)
  - Playhead indicator
  - Store timeline state in EDL (MongoDB)
- [ ] **US-4.2: Add Clips to Timeline**
  - Drag from media library to timeline
  - Drop on appropriate track
  - Snap-to logic (clips, playhead)
  - Update EDL
- [ ] **US-4.3: Trim Clips**
  - Trim handles on clip edges
  - Update clip in/out points in EDL
  - Sync preview with trim
- [ ] **US-4.4: Split Clips**
  - Keyboard shortcut: S
  - Split clip at playhead
  - Update EDL with two new clips

---

### Week 9: Timeline Advanced + Preview
**Milestone**: Epic 4 Part 2 (US-4.5 to US-4.7) + Epic 5 (US-5.1 to US-5.3)

- [ ] **US-4.5: Delete Clips from Timeline**
  - Delete key removes selected clip
  - Right-click context menu
  - Ripple delete option
- [ ] **US-4.6: Move Clips on Timeline**
  - Drag clip to new position
  - Snap to edges
  - Move between tracks
- [ ] **US-4.7: Undo/Redo**
  - Command pattern implementation
  - Undo/redo stack (50 actions)
  - Keyboard shortcuts: Cmd/Ctrl+Z, Cmd/Ctrl+Shift+Z
- [ ] **US-5.1: Preview Playback**
  - Video player component
  - Play/pause, scrub
  - Sync with timeline playhead
- [ ] **US-5.2: Scrub Timeline**
  - Click timeline to move playhead
  - Drag playhead to scrub
  - Frame-accurate seek
- [ ] **US-5.3: Fullscreen Preview**
  - Fullscreen button
  - F key toggles fullscreen

---

## Phase 4: Billing (Week 10)

**Goal**: Users can purchase subscriptions and manage credits

### Week 10: Stripe Integration
**Milestone**: Epic 2 (US-2.1 to US-2.5)

- [ ] **US-2.1: View Subscription Plans**
  - Frontend: Pricing page
  - Display Starter ($30) and Pro ($50) plans
  - Feature comparison table
- [ ] **US-2.2: Purchase Subscription**
  - Integrate Stripe Checkout
  - Spring Boot: POST /subscriptions/checkout endpoint
  - Stripe webhook: POST /webhooks/stripe
  - Update subscription in Postgres
  - Add credits on successful payment
- [ ] **US-2.3: View Credit Balance**
  - Display in header/sidebar
  - Real-time update after operations
  - Low credit warning (< 10%)
- [ ] **US-2.4: View Credit Usage History**
  - GET /credits/history endpoint
  - Frontend: Usage history page with filters
  - Export to CSV
- [ ] **US-2.5: Credit Deduction on Feature Use**
  - Deduct credits before job starts
  - Refund if job fails
  - Insufficient credits check

---

## Phase 5: AI Foundation - Transcription & TTS (Weeks 11-13)

**Goal**: Set up Modal, Kafka integration, and first AI features

### Week 11: Modal + Kafka Setup
**Milestone**: INFRA-7 (Modal) + Kafka job flow

- [ ] **Setup Modal**
  - Create Modal account
  - Install Modal CLI
  - Create `apps/modal` directory
  - Download AI models to Modal volumes:
    - Whisper (large-v3)
    - Pyannote 3.1
    - F5-TTS
- [ ] **Kafka Job Orchestrator**
  - Spring Boot: Consumer for `jobs.requested`
  - Route to specific topics: `jobs.transcription`, `jobs.tts`, etc.
  - Producer for `jobs.completed`, `jobs.failed`
- [ ] **Modal Kafka Consumer**
  - Python: confluent-kafka integration
  - Listen to `jobs.transcription`
  - Test end-to-end flow

---

### Week 12: Transcription (Text-Based Editing Foundation)
**Milestone**: Epic 6 Part 1 (US-6.1, US-6.2)

- [ ] **US-6.1: Generate Transcript**
  - Spring Boot: POST /jobs/transcription endpoint
  - Publish to Kafka: `jobs.requested` (type=TRANSCRIPTION)
  - Modal worker: Run Whisper + Pyannote
  - Upload results to R2
  - Publish to `jobs.completed`
  - Store transcript in MongoDB (word-level timestamps)
  - Frontend: "Generate Transcript" button, progress indicator
- [ ] **US-6.2: View Transcript**
  - Frontend: Transcript panel (Tiptap editor)
  - Display with speaker labels
  - Highlight current word during playback
  - Click word to jump to timestamp
  - Search within transcript

---

### Week 13: Text-Based Editing - Core Features ⭐ **CRITICAL**
**Milestone**: Epic 6 Part 2 (US-6.3, US-6.5, US-6.6)

- [ ] **US-6.3: Delete Text → Delete Video**
  - Select text range in transcript
  - Delete removes corresponding clips from timeline
  - Strikethrough shows deleted sections
  - Ripple delete in timeline
- [ ] **US-6.5: Edit Words (Overdub)** ⭐ **KILLER FEATURE**
  - Double-click word to edit inline
  - Word-level diff detection
  - Extract speaker voice from surrounding 10-sec audio
  - Auto voice cloning (no manual upload)
  - Spring Boot: POST /jobs/overdub endpoint
  - Kafka: `jobs.overdub` topic
  - Modal worker: F5-TTS with cloned voice
  - Replace audio in timeline
  - If video: auto-trigger lip-sync
  - Visual edit marker (✏️ badge)
- [ ] **US-6.6: Insert New Text** ⭐ **KILLER FEATURE**
  - Click between words to place cursor
  - Type new text
  - Voice selection dialog (speaker or library)
  - Spring Boot: POST /jobs/insert-speech endpoint
  - Generate TTS
  - Insert at cursor with ripple edit
  - Add natural pauses (0.5s)
  - Blue highlight for inserted text

---

## Phase 6: Text-Based Editing - Polish (Week 14)

**Milestone**: Epic 6 Part 3 (US-6.7 to US-6.10) + Epic 7 Part 1

### Week 14: Productivity Features
- [ ] **US-6.7: Remove Filler Words (One-Click)**
  - Detect: um, uh, like, you know, etc.
  - Highlight in yellow (preview)
  - Toggle individual detections
  - Batch delete with ripple
  - Free feature
- [ ] **US-6.8: Rearrange Sentences (Drag-and-Drop)**
  - Sentence-level DnD with dnd-kit
  - Timeline auto-reorders clips
  - Crossfades applied (0.1s)
- [ ] **US-6.9: Find and Replace**
  - Cmd/Ctrl+F opens toolbar
  - Find all instances
  - Replace individual or all
  - Batch TTS generation with progress
- [ ] **US-6.10: Transcript Edit Markers**
  - Visual indicators: ✏️ edited, ➕ inserted, 🗑️ deleted
  - Hover tooltip with history
  - "Revert to Original" option
  - Export with edit log (JSON)
- [ ] **US-6.4: Export Transcript**
  - Export as SRT, VTT, plain text, JSON
- [ ] **US-7.1: Clone Voice from Sample**
  - Upload 10-sec audio sample
  - Store in voice library (Postgres + R2)
  - Used by US-6.6 (insert text)

---

## Phase 7: Advanced AI Features (Weeks 15-17)

### Week 15: Text-to-Speech
**Milestone**: Epic 7 (US-7.2, US-7.3)

- [ ] **US-7.2: Generate Speech from Text**
  - Select voice from library
  - Enter text
  - Adjust speed (0.5x to 2x)
  - Preview audio
  - Add to timeline
  - Cost: 2 credits per minute
- [ ] **US-7.3: Replace Dialogue with TTS**
  - Select text in transcript
  - "Replace with TTS" option
  - Edit replacement text
  - Auto lip-sync if video
  - Chained job: TTS + Lip Sync

---

### Week 16: Lip Sync
**Milestone**: Epic 8 (US-8.1, US-8.2)

- [ ] **US-8.1: Sync Lips to Audio**
  - Select video clip with face
  - Select replacement audio
  - Modal worker: MuseTalk (A10G GPU)
  - Face detection with MediaPipe
  - GFPGAN upscaling
  - Preview result
  - Cost: 15 credits per minute
- [ ] **US-8.2: Auto Lip-Sync on TTS Replace**
  - Automatically triggered when replacing speech
  - Combined credit cost
  - Opt-out toggle

---

### Week 17: Performance Cloning
**Milestone**: Epic 9 (US-9.1, US-9.2)

- [ ] **US-9.1: Animate Portrait from Video**
  - Upload source portrait
  - Record/upload driving video
  - Modal worker: LivePortrait + MediaPipe
  - Adjust expression intensity
  - Cost: 12 credits per minute
- [ ] **US-9.2: Record Webcam as Driver**
  - Electron: Webcam access
  - Record performance
  - Live preview option
  - Save and use as driver

---

## Phase 8: Pro Features (Week 18)

### Week 18: Gaze, Video Q&A, Audio Generation
**Milestone**: Epics 10, 11, 12

- [ ] **US-10.1: Redirect Gaze to Camera** (Pro only)
  - LivePortrait retargeting
  - Before/after preview
  - Cost: 10 credits per minute
- [ ] **US-11.1: Query Video Content**
  - Modal worker: Qwen2.5-VL-7B (A10G)
  - Natural language questions
  - Extract key frames for context
  - Click timestamp to jump
  - Cost: 3 credits per query
- [ ] **US-11.2: Find Moments by Description**
  - Search: "when the actor smiles"
  - Thumbnail results with timestamps
- [ ] **US-12.1: Generate Ambient Audio**
  - Modal worker: AudioLDM-2 (A10G)
  - Text prompt → background audio
  - Specify duration
  - Cost: 8 credits per minute
- [ ] **US-12.2: Extend Existing Audio**
  - Select audio clip
  - Specify additional duration
  - AI generates matching continuation

---

## Phase 9: AI Video Generation (Week 19) - Pro Only

### Week 19: Text-to-Video
**Milestone**: Epic 14 (US-14.1, US-14.2)

- [ ] **US-14.1: Generate Video from Text**
  - Modal worker: Wan2.1-T2V-14B (A100-80GB)
  - Text prompt (max 500 chars)
  - 5-second clips at 720p
  - Job queue (1-2 min processing)
  - Cost: 50 credits per 5-sec clip
- [ ] **US-14.2: Image-to-Video Animation**
  - Upload source image
  - Enter motion prompt
  - Wan2.1 image-to-video mode
  - Cost: 50 credits per 5-sec clip

---

## Phase 10: LLM Script Assistant (Week 19)

### Week 19: Script Writing Help
**Milestone**: Epic 13 (US-13.1, US-13.2)

- [ ] **US-13.1: Script Writing Help**
  - Script editor panel (Tiptap)
  - "AI Suggest" button
  - Modal worker: Llama-3-70B via vLLM
  - Accept/reject suggestions
  - Cost: 1 credit per query
- [ ] **US-13.2: Generate Video Prompts** (Pro only)
  - Improve prompts for video generation
  - Suggest cinematic details

---

## Phase 11: Cloud Rendering & Polish (Week 20)

### Week 20: Production Features
**Milestone**: Epic 15 (US-15.1, US-15.2) + INFRA-8

- [ ] **US-15.1: Export Final Video** (Pro feature)
  - Cloud render with FFmpeg (Spring Boot or Modal)
  - Select resolution (720p, 1080p, 4K)
  - Select format (MP4, MOV, WebM)
  - Generate EDL in FFmpeg format
  - Cost: 5 credits per minute (1080p)
- [ ] **US-15.2: Render Preview**
  - Quick render at 480p
  - Lower credit cost
  - Playable in-app
- [ ] **INFRA-8: CI/CD (GitHub Actions)**
  - Frontend: Lint, typecheck, build (Electron + Next.js)
  - Backend: Maven test, build JAR, deploy to GCP VM
  - Modal: Deploy GPU functions
- [ ] **Security Audit**
  - OWASP dependency scanning
  - CSP policy review
  - JWT validation review
- [ ] **Performance Optimization**
  - Timeline virtualization (@tanstack/react-virtual)
  - Lazy loading for media thumbnails
  - React Query caching optimization
- [ ] **E2E Tests with Playwright**
  - Test full user flow: sign up → create project → edit → export
  - Both desktop and web
- [ ] **Documentation**
  - Update README with deployment guide
  - API documentation (Swagger/OpenAPI)
  - Architecture diagrams

---

## 📚 Learning Path Summary

**Complexity Progression:**
1. **Weeks 1-5**: Infrastructure (no features, pure setup)
2. **Weeks 6-7**: CRUD operations (auth, projects)
3. **Weeks 8-9**: Complex UI (timeline with drag-and-drop)
4. **Week 10**: Third-party integration (Stripe)
5. **Weeks 11-14**: ⭐ **AI + async jobs (Kafka + Modal) + TEXT-BASED EDITING**
6. **Weeks 15-20**: Advanced AI features

**Critical Path:**
- Must complete Phases 1-3 before any AI features
- Must complete Phase 5 (transcription) before text-based editing
- Text-based editing (US-6.5, US-6.6) is the **killer feature** - prioritize quality over speed

**Why This Order:**
1. **Infrastructure first** - Can't build features without backend/frontend
2. **Auth + Projects** - Core functionality needed for all features
3. **Timeline** - Foundation for video editing
4. **Text-based editing early** - Core differentiator, validates product concept
5. **Advanced AI later** - Build confidence with simpler AI features first

---

## 🎯 Quick Reference: Where to Find User Stories

| Epic | User Stories | File |
|------|--------------|------|
| Epic 1: Authentication | US-1.1 to US-1.5 | part1.md |
| Epic 2: Billing | US-2.1 to US-2.5 | part1.md |
| Epic 3: Projects | US-3.1 to US-3.6 | part1.md |
| Epic 4: Timeline | US-4.1 to US-4.7 | part1.md |
| Epic 5: Preview | US-5.1 to US-5.3 | part1.md |
| Epic 6: Transcription + Text Editing | US-6.1 to US-6.10 | part2.md |
| Epic 7: TTS | US-7.1 to US-7.3 | part2.md |
| Epic 8: Lip Sync | US-8.1 to US-8.2 | part2.md |
| Epic 9: Performance Cloning | US-9.1 to US-9.2 | part2.md |
| Epic 10: Gaze Redirection | US-10.1 | part2.md |
| Epic 11: Video Q&A | US-11.1 to US-11.2 | part2.md |
| Epic 12: Audio Generation | US-12.1 to US-12.2 | part2.md |
| Epic 13: LLM Script Assistant | US-13.1 to US-13.2 | part2.md |
| Epic 14: Text-to-Video | US-14.1 to US-14.2 | part2.md |
| Epic 15: Cloud Rendering | US-15.1 to US-15.2 | part2.md |

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
**Goal**: Text-Based Editing (Descript-Killer Features) + Transcription

### Milestone 4.1: Modal + Kafka Integration
- [ ] Setup Modal GPU environment (A10G for transcription, L4 for TTS)
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
- [ ] US-6.2: View transcript with word-level timestamps

### Milestone 4.3: Core Text-Based Editing ⭐ **PRIORITY**

**Week 10-11: The Descript-Killer Features**

- [ ] US-6.5: **Edit words in transcript (Overdub)**
  - [ ] Inline editing with Tiptap
  - [ ] Word-level diff detection
  - [ ] Automatic voice cloning from context
  - [ ] TTS generation with cloned voice
  - [ ] Auto lip-sync if video has face
  - [ ] Visual edit markers
- [ ] US-6.6: **Insert new text into transcript**
  - [ ] Cursor positioning
  - [ ] Voice selection dialog
  - [ ] TTS generation for inserted text
  - [ ] Ripple editing in timeline
  - [ ] Natural pause handling
- [ ] US-6.3: Delete text → delete video (already exists, ensure integration)

**Week 12: Polish & Productivity Features**

- [ ] US-6.7: Remove filler words (one-click)
  - [ ] Filler word detection algorithm
  - [ ] Batch deletion with preview
- [ ] US-6.8: Rearrange sentences by drag-and-drop
  - [ ] Sentence-level DnD
  - [ ] Timeline auto-reorder
- [ ] US-6.9: Find and replace
  - [ ] Batch TTS generation
  - [ ] Progress indicator
- [ ] US-6.10: Transcript edit markers
  - [ ] Visual indicators for edits
  - [ ] Export edit log
- [ ] US-6.4: Export transcript

### Milestone 4.4: TTS Voice Library (Foundation)
- [ ] Create voice library UI
- [ ] US-7.1: Clone voice from sample (manual upload)
- [ ] Store voice profiles in Postgres
- [ ] Use in US-6.6 (insert text)

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
7. **Week 7-8**: Timeline with dnd-kit + react-virtual + Tiptap
8. **Week 9**: Billing (Stripe)
9. **Week 10-12**: ⭐ **TEXT-BASED EDITING** (Overdub, Insert, Fillers, Rearrange)
   - This is your **killer feature** - prioritize getting this working perfectly
   - From transcript → edit word → AI regenerates → timeline updates
   - This is what makes Auteur a Descript competitor

This gives you exposure to:
- **Monorepo architecture** with Turborepo
- **Desktop vs Web** development (Electron + Next.js)
- **Enterprise Java** with Spring Boot 3.2
- **Event-driven architecture** with Kafka (Confluent Cloud)
- **Serverless GPUs** with Modal
- **Modern React** with shadcn/ui, dnd-kit, react-virtual, Tiptap
- **Full-stack integration** (TypeScript frontend ↔ Java backend ↔ Python GPU workers)
- **Cloud infrastructure** (GCP VM, Supabase, MongoDB, R2)
- **Text-based video editing** - the core innovation that differentiates Auteur

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

# Auteur AI - GitHub Issues (Backlog Ready)

> Copy each section as a GitHub Issue. Labels are provided for filtering.

---

## Epic Issues

### EPIC-1: User Authentication & Account Management
**Labels:** `epic`, `auth`, `priority:high`

User registration, login, logout, password reset, and profile management using Supabase Auth.

**Child Issues:** US-1.1 through US-1.5

---

### EPIC-2: Subscription & Credit Management
**Labels:** `epic`, `billing`, `priority:high`

Stripe subscription integration, credit-based usage system, and usage tracking.

**Child Issues:** US-2.1 through US-2.5

---

### EPIC-3: Project Management
**Labels:** `epic`, `core`, `priority:high`

Create, open, save, delete projects. Import media files to Cloudflare R2.

**Child Issues:** US-3.1 through US-3.6

---

### EPIC-4: Timeline Editor
**Labels:** `epic`, `editor`, `priority:high`

Timeline component with tracks, clips, trim, split, move, undo/redo.

**Child Issues:** US-4.1 through US-4.7

---

### EPIC-5: Video Preview
**Labels:** `epic`, `editor`, `priority:high`

Playback, scrubbing, fullscreen preview.

**Child Issues:** US-5.1 through US-5.3

---

### EPIC-6: AI - Diarization & Transcription
**Labels:** `epic`, `ai-feature`, `priority:high`

Whisper + Pyannote transcription with speaker labels.

**Child Issues:** US-6.1 through US-6.4

---

### EPIC-7: AI - Synthetic Voice (TTS)
**Labels:** `epic`, `ai-feature`, `priority:medium`

F5-TTS voice cloning and speech generation.

**Child Issues:** US-7.1 through US-7.3

---

### EPIC-8: AI - Neural Dubbing (Lip Sync)
**Labels:** `epic`, `ai-feature`, `priority:medium`

MuseTalk lip synchronization.

**Child Issues:** US-8.1, US-8.2

---

### EPIC-9: AI - Performance Cloning
**Labels:** `epic`, `ai-feature`, `priority:medium`

LivePortrait + MediaPipe animation.

**Child Issues:** US-9.1, US-9.2

---

### EPIC-10: AI - Gaze Redirection
**Labels:** `epic`, `ai-feature`, `pro-only`, `priority:low`

LivePortrait retargeting for gaze correction.

**Child Issues:** US-10.1

---

### EPIC-11: AI - Script Supervision
**Labels:** `epic`, `ai-feature`, `priority:medium`

Qwen2.5-VL video understanding and querying.

**Child Issues:** US-11.1, US-11.2

---

### EPIC-12: AI - Sound Stage
**Labels:** `epic`, `ai-feature`, `priority:low`

AudioLDM-2 ambient audio generation.

**Child Issues:** US-12.1, US-12.2

---

### EPIC-13: AI - Script Assistant
**Labels:** `epic`, `ai-feature`, `priority:low`

Llama-3-70B LLM for script writing.

**Child Issues:** US-13.1, US-13.2

---

### EPIC-14: AI - AI Cinematography
**Labels:** `epic`, `ai-feature`, `pro-only`, `priority:medium`

Wan2.1 text-to-video generation.

**Child Issues:** US-14.1, US-14.2

---

### EPIC-15: Cloud Rendering
**Labels:** `epic`, `render`, `pro-only`, `priority:low`

Server-side FFmpeg rendering.

**Child Issues:** US-15.1, US-15.2

---

## User Story Issues

### US-1.1: User Registration
**Labels:** `user-story`, `auth`, `priority:high`, `size:M`

**As a** new user  
**I want to** create an account using email or OAuth  
**So that** I can access Auteur's features

**Acceptance Criteria:**
- [ ] User can register with email/password
- [ ] User can register with Google OAuth
- [ ] User can register with GitHub OAuth
- [ ] Email verification required
- [ ] Password min 8 chars, 1 number, 1 special char
- [ ] Duplicate email error handling

**Tasks:**
- [ ] Configure Supabase Auth providers
- [ ] Create registration API endpoint
- [ ] Implement email verification flow
- [ ] Create user record in Postgres
- [ ] Initialize credit balance

---

### US-1.2: User Login
**Labels:** `user-story`, `auth`, `priority:high`, `size:M`

**As a** registered user  
**I want to** log into the Electron app  
**So that** I can access my projects and credits

**Acceptance Criteria:**
- [ ] Login with email/password
- [ ] Login with Google/GitHub OAuth
- [ ] JWT stored securely in Electron
- [ ] Session persists across restarts
- [ ] Rate limiting (5/min)

---

### US-1.3: User Logout
**Labels:** `user-story`, `auth`, `priority:high`, `size:S`

**As a** user, I want to log out securely.

---

### US-1.4: Password Reset
**Labels:** `user-story`, `auth`, `priority:medium`, `size:S`

**As a** user who forgot password, I want to reset via email.

---

### US-1.5: View Account Profile
**Labels:** `user-story`, `auth`, `priority:medium`, `size:S`

**As a** user, I want to see my plan, credits, and usage.

---

### US-2.1: View Subscription Plans
**Labels:** `user-story`, `billing`, `priority:high`, `size:S`

Display Starter ($30/1500 credits) and Pro ($50/3000 credits) plans.

---

### US-2.2: Purchase Subscription
**Labels:** `user-story`, `billing`, `priority:high`, `size:L`

Stripe Checkout integration for subscriptions.

**Tasks:**
- [ ] Integrate Stripe Checkout
- [ ] Create webhook handler
- [ ] Update subscription in DB
- [ ] Add credits to balance

---

### US-2.3: View Credit Balance
**Labels:** `user-story`, `billing`, `priority:high`, `size:S`

Real-time credit balance in header with low-credit warning.

---

### US-2.4: View Credit Usage History
**Labels:** `user-story`, `billing`, `priority:medium`, `size:M`

Transaction history with filters and CSV export.

---

### US-2.5: Credit Deduction System
**Labels:** `user-story`, `billing`, `priority:high`, `size:M`

Deduct before job, refund on failure, block if insufficient.

---

### US-3.1: Create New Project
**Labels:** `user-story`, `project`, `priority:high`, `size:M`

Create project with name, resolution, frame rate settings.

---

### US-3.2: Import Media Files
**Labels:** `user-story`, `project`, `priority:high`, `size:L`

Drag-drop upload to R2 with progress. Support MP4, MOV, WebM, MP3, WAV.

---

### US-3.3: View Project Media Library
**Labels:** `user-story`, `project`, `priority:high`, `size:M`

Grid view with thumbnails, search, filter, delete.

---

### US-3.4: Save Project
**Labels:** `user-story`, `project`, `priority:high`, `size:M`

Auto-save every 30s, manual save, conflict detection.

---

### US-3.5: Open Existing Project
**Labels:** `user-story`, `project`, `priority:high`, `size:M`

Dashboard with recent projects, load EDL and media.

---

### US-3.6: Delete Project
**Labels:** `user-story`, `project`, `priority:medium`, `size:S`

Delete with confirmation, remove R2 files.

---

### US-4.1: View Timeline
**Labels:** `user-story`, `editor`, `priority:high`, `size:L`

Timeline with time ruler, tracks, playhead, zoom.

---

### US-4.2: Add Clips to Timeline
**Labels:** `user-story`, `editor`, `priority:high`, `size:M`

Drag from library, drop on track, snap to edges.

---

### US-4.3: Trim Clips
**Labels:** `user-story`, `editor`, `priority:high`, `size:M`

Drag edges to trim in/out points.

---

### US-4.4: Split Clips
**Labels:** `user-story`, `editor`, `priority:high`, `size:S`

Split at playhead with keyboard shortcut.

---

### US-4.5: Delete Clips
**Labels:** `user-story`, `editor`, `priority:high`, `size:S`

Delete selected, ripple delete option.

---

### US-4.6: Move Clips
**Labels:** `user-story`, `editor`, `priority:high`, `size:M`

Drag to reposition, snap to grid/clips.

---

### US-4.7: Undo/Redo
**Labels:** `user-story`, `editor`, `priority:high`, `size:M`

Command pattern, 50+ action history.

---

### US-5.1: Preview Playback
**Labels:** `user-story`, `preview`, `priority:high`, `size:M`

Play/pause, spacebar toggle, sync with timeline.

---

### US-5.2: Scrub Timeline
**Labels:** `user-story`, `preview`, `priority:high`, `size:M`

Click/drag playhead for frame-accurate scrubbing.

---

### US-5.3: Fullscreen Preview
**Labels:** `user-story`, `preview`, `priority:medium`, `size:S`

F key toggle, ESC exit, maintain aspect ratio.

---

### US-6.1: Generate Transcript
**Labels:** `user-story`, `ai-feature`, `transcription`, `priority:high`, `size:L`

Whisper + Pyannote transcription. 5 credits/10 min.

---

### US-6.2: View Transcript
**Labels:** `user-story`, `ai-feature`, `transcription`, `priority:high`, `size:M`

Transcript panel with word-level sync, click to seek.

---

### US-6.3: Edit via Transcript
**Labels:** `user-story`, `ai-feature`, `transcription`, `priority:high`, `size:L`

Delete text to delete video, strikethrough deleted.

---

### US-6.4: Export Transcript
**Labels:** `user-story`, `ai-feature`, `transcription`, `priority:medium`, `size:S`

Export as SRT, VTT, TXT, JSON.

---

### US-7.1: Clone Voice from Sample
**Labels:** `user-story`, `ai-feature`, `tts`, `priority:medium`, `size:M`

Upload 10-sec sample, save to voice library.

---

### US-7.2: Generate Speech from Text
**Labels:** `user-story`, `ai-feature`, `tts`, `priority:medium`, `size:M`

F5-TTS generation. 2 credits/min.

---

### US-7.3: Replace Dialogue with TTS
**Labels:** `user-story`, `ai-feature`, `tts`, `priority:medium`, `size:M`

Select transcript text, replace with TTS, chain lip-sync.

---

### US-8.1: Sync Lips to Audio
**Labels:** `user-story`, `ai-feature`, `lip-sync`, `priority:medium`, `size:L`

MuseTalk processing. 15 credits/min.

---

### US-8.2: Auto Lip-Sync on TTS Replace
**Labels:** `user-story`, `ai-feature`, `lip-sync`, `priority:medium`, `size:M`

Chain TTS + lip-sync as single job.

---

### US-9.1: Animate Portrait from Video
**Labels:** `user-story`, `ai-feature`, `liveportrait`, `priority:medium`, `size:L`

LivePortrait + MediaPipe. 12 credits/min.

---

### US-9.2: Record Webcam as Driver
**Labels:** `user-story`, `ai-feature`, `liveportrait`, `priority:low`, `size:M`

Webcam access, record, use as driving video.

---

### US-10.1: Redirect Gaze to Camera
**Labels:** `user-story`, `ai-feature`, `pro-only`, `priority:low`, `size:M`

LivePortrait retargeting. 10 credits/min.

---

### US-11.1: Query Video Content
**Labels:** `user-story`, `ai-feature`, `vision`, `priority:medium`, `size:L`

Qwen2.5-VL chat. 3 credits/query.

---

### US-11.2: Find Moments by Description
**Labels:** `user-story`, `ai-feature`, `vision`, `priority:medium`, `size:M`

Search for moments with thumbnails.

---

### US-12.1: Generate Ambient Audio
**Labels:** `user-story`, `ai-feature`, `audio`, `priority:low`, `size:M`

AudioLDM-2 text-to-audio. 8 credits/min.

---

### US-12.2: Extend Existing Audio
**Labels:** `user-story`, `ai-feature`, `audio`, `priority:low`, `size:M`

Audio inpainting to extend room tone.

---

### US-13.1: Script Writing Help
**Labels:** `user-story`, `ai-feature`, `llm`, `priority:low`, `size:M`

Llama-3-70B suggestions. 1 credit/query.

---

### US-13.2: Generate Video Prompts
**Labels:** `user-story`, `ai-feature`, `llm`, `pro-only`, `priority:low`, `size:S`

AI prompt enhancement for video generation.

---

### US-14.1: Generate Video from Text
**Labels:** `user-story`, `ai-feature`, `pro-only`, `video-gen`, `priority:medium`, `size:XL`

Wan2.1 text-to-video. 50 credits/5sec.

---

### US-14.2: Image-to-Video Animation
**Labels:** `user-story`, `ai-feature`, `pro-only`, `video-gen`, `priority:medium`, `size:L`

Wan2.1 image animation.

---

### US-15.1: Export Final Video
**Labels:** `user-story`, `render`, `pro-only`, `priority:low`, `size:L`

Cloud FFmpeg render. 5 credits/min 1080p.

---

### US-15.2: Render Preview
**Labels:** `user-story`, `render`, `priority:low`, `size:M`

Quick 480p preview render.

---

## Infrastructure Issues

### INFRA-1: Setup Electron + React Project
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Initialize Electron with Vite + React + TypeScript
- [ ] Configure context isolation and preload scripts
- [ ] Setup secure IPC via ContextBridge
- [ ] Configure ESLint, Prettier
- [ ] Setup electron-store for secure storage

---

### INFRA-2: Setup Cloud Run API
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Initialize FastAPI project
- [ ] Configure Pydantic models
- [ ] Setup Supabase client
- [ ] Setup JWT verification middleware
- [ ] Configure Cloud Run deployment
- [ ] Setup Secret Manager integration

---

### INFRA-3: Setup Modal Backend
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Create Modal account and app
- [ ] Configure container images (audio, vision)
- [ ] Setup modal.Volume for model weights
- [ ] Create model download functions
- [ ] Configure secrets for HF tokens

---

### INFRA-4: Setup Supabase
**Labels:** `infrastructure`, `priority:high`, `size:M`

- [ ] Create Supabase project
- [ ] Configure Auth providers (email, Google, GitHub)
- [ ] Create database schema (migrations)
- [ ] Setup Row Level Security policies
- [ ] Configure email templates

---

### INFRA-5: Setup MongoDB Atlas
**Labels:** `infrastructure`, `priority:medium`, `size:M`

- [ ] Create MongoDB Atlas cluster
- [ ] Create indexes for project_id
- [ ] Configure connection from Cloud Run
- [ ] Create EDL document schema

---

### INFRA-6: Setup Cloudflare R2
**Labels:** `infrastructure`, `priority:high`, `size:M`

- [ ] Create R2 bucket
- [ ] Configure CORS for uploads
- [ ] Setup presigned URL generation
- [ ] Configure lifecycle rules

---

### INFRA-7: Setup CI/CD Pipeline
**Labels:** `infrastructure`, `priority:medium`, `size:L`

- [ ] GitHub Actions for Electron build
- [ ] GitHub Actions for Cloud Run deploy
- [ ] GitHub Actions for Modal deploy
- [ ] Configure staging/production environments
- [ ] Setup auto-update for Electron

---

### INFRA-8: Setup Stripe Integration
**Labels:** `infrastructure`, `billing`, `priority:high`, `size:M`

- [ ] Create Stripe account
- [ ] Configure products/prices
- [ ] Setup webhook endpoint
- [ ] Configure Checkout sessions

---

## Suggested Labels

Create these labels in your GitHub repository:

| Label | Color | Description |
|-------|-------|-------------|
| `epic` | #7057ff | Epic/Feature area |
| `user-story` | #0e8a16 | User story |
| `infrastructure` | #d93f0b | Infrastructure task |
| `priority:high` | #b60205 | High priority |
| `priority:medium` | #fbca04 | Medium priority |
| `priority:low` | #c2e0c6 | Low priority |
| `size:S` | #bfd4f2 | Small (1-2 days) |
| `size:M` | #7db8d9 | Medium (3-5 days) |
| `size:L` | #5ca9d6 | Large (1-2 weeks) |
| `size:XL` | #2a8fd3 | Extra large (2+ weeks) |
| `auth` | #fef2c0 | Authentication |
| `billing` | #f9d0c4 | Billing/credits |
| `project` | #c5def5 | Project management |
| `editor` | #bfdadc | Timeline editor |
| `preview` | #d4c5f9 | Video preview |
| `ai-feature` | #ff6b6b | AI feature |
| `pro-only` | #e99695 | Pro plan only |
| `transcription` | #c2f0fc | Transcription feature |
| `tts` | #c2f0c2 | Text to speech |
| `lip-sync` | #f0c2f0 | Lip sync feature |
| `liveportrait` | #f0f0c2 | LivePortrait feature |
| `vision` | #c2c2f0 | Video understanding |
| `audio` | #f0c2c2 | Audio generation |
| `llm` | #c2f0f0 | LLM assistant |
| `video-gen` | #6b6bff | Video generation |
| `render` | #6bff6b | Cloud render |

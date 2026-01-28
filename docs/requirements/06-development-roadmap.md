# Auteur AI - Development Roadmap

## Phase 1: Foundation (Weeks 1-3)
**Goal:** Core infrastructure and authentication

### Milestone 1.1: Project Setup
- [ ] INFRA-1: Electron + React + TypeScript setup
- [ ] INFRA-2: Cloud Run FastAPI setup
- [ ] INFRA-4: Supabase setup
- [ ] INFRA-6: Cloudflare R2 setup

### Milestone 1.2: Authentication
- [ ] US-1.1: User registration
- [ ] US-1.2: User login
- [ ] US-1.3: User logout
- [ ] US-1.4: Password reset
- [ ] US-1.5: View profile

---

## Phase 2: Core Editor (Weeks 4-6)
**Goal:** Functional timeline editor

### Milestone 2.1: Project Management
- [ ] US-3.1: Create project
- [ ] US-3.2: Import media
- [ ] US-3.3: Media library
- [ ] US-3.4: Save project
- [ ] US-3.5: Open project
- [ ] INFRA-5: MongoDB setup

### Milestone 2.2: Timeline
- [ ] US-4.1: View timeline
- [ ] US-4.2: Add clips
- [ ] US-4.3: Trim clips
- [ ] US-4.4: Split clips
- [ ] US-4.5: Delete clips
- [ ] US-4.6: Move clips
- [ ] US-4.7: Undo/redo

### Milestone 2.3: Preview
- [ ] US-5.1: Playback
- [ ] US-5.2: Scrub
- [ ] US-5.3: Fullscreen

---

## Phase 3: Billing (Week 7)
**Goal:** Subscription and credits

- [ ] INFRA-8: Stripe setup
- [ ] US-2.1: View plans
- [ ] US-2.2: Purchase subscription
- [ ] US-2.3: View credits
- [ ] US-2.4: Usage history
- [ ] US-2.5: Credit deduction

---

## Phase 4: First AI Features (Weeks 8-10)
**Goal:** Transcription and TTS (most foundational)

### Milestone 4.1: Modal Setup
- [ ] INFRA-3: Modal backend setup
- [ ] Download Whisper + Pyannote models
- [ ] Download F5-TTS models

### Milestone 4.2: Transcription
- [ ] US-6.1: Generate transcript
- [ ] US-6.2: View transcript
- [ ] US-6.3: Edit via transcript
- [ ] US-6.4: Export transcript

### Milestone 4.3: TTS
- [ ] US-7.1: Clone voice
- [ ] US-7.2: Generate speech

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

## Phase 7: Polish (Weeks 19-20)
**Goal:** Cloud render, CI/CD, testing

- [ ] US-15.1: Cloud render
- [ ] US-15.2: Preview render
- [ ] INFRA-7: CI/CD pipeline
- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation

---

## Recommended Starting Point

For learning purposes, start with:

1. **Week 1**: INFRA-1 (Electron + React)
2. **Week 2**: INFRA-4 (Supabase) + Auth
3. **Week 3**: INFRA-2 (Cloud Run) + INFRA-6 (R2)
4. **Week 4-5**: Project + Timeline basics
5. **Week 6**: INFRA-3 (Modal) + first AI feature

This gives you exposure to:
- Desktop app development
- Authentication flows
- REST API design
- Serverless GPU computing
- File storage patterns
- Job queue patterns

# Auteur AI - Product Requirements Document (PRD)

## 1. Product Vision

**Auteur** is an enterprise-grade AI video editing platform that democratizes cinematic-quality video production. By combining a responsive Electron desktop application with serverless GPU infrastructure, Auteur enables creators on consumer hardware to access state-of-the-art generative AI capabilities.

### 1.1 Mission Statement
Empower video creators with AI-powered tools that were previously only available to high-budget productions, while maintaining commercial compliance and cost efficiency.

### 1.2 Success Metrics
- User can generate AI video content without local GPU
- Sub-5-minute turnaround for standard AI operations
- 99.9% uptime for core services
- Credit costs align with projected margins

---

## 2. User Personas

### Persona 1: Independent Content Creator (Primary)
- **Name**: Alex
- **Role**: YouTuber / Podcaster
- **Tech Level**: Intermediate
- **Hardware**: MacBook Pro M2 (no dedicated GPU)
- **Pain Points**: 
  - Cannot run local AI models
  - Spends hours on manual lip-sync fixes
  - Needs professional voiceovers but can't afford voice actors
- **Goals**: 
  - Create professional content quickly
  - Automate repetitive editing tasks

### Persona 2: Small Production Studio
- **Name**: Creative Edge Studios
- **Role**: Commercial video production
- **Tech Level**: Advanced
- **Pain Points**:
  - High cost of re-shoots for gaze/delivery issues
  - Time-consuming subtitle generation
  - Need AI B-roll generation
- **Goals**:
  - Reduce post-production time by 50%
  - Generate AI content for pitches

### Persona 3: Learning Developer (You!)
- **Name**: Developer
- **Role**: Building to learn
- **Goals**:
  - Understand GPU pipeline architecture
  - Learn queue management and job orchestration
  - Explore security best practices
  - Test cost/quality tradeoffs

---

## 3. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ELECTRON APP                         │
│                 React + TypeScript                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Timeline Editor │ Preview │ Project Manager    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTPS + Supabase JWT
                          ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE CLOUD RUN (API Layer)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  - Auth validation          - Credit management  │  │
│  │  - Job orchestration        - Webhook handlers   │  │
│  │  - Rate limiting            - Usage analytics    │  │
│  └──────────────────────────────────────────────────┘  │
└────────┬──────────────┬──────────────┬──────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐
│  SUPABASE   │  │   MODAL     │  │  CLOUDFLARE R2      │
│  ─────────  │  │  ─────────  │  │  ───────────────    │
│  - Auth     │  │  - A100 GPU │  │  - Video uploads    │
│  - Postgres │  │  - A10G GPU │  │  - Generated assets │
│  - Users    │  │  - L4/T4    │  │  - Project files    │
│  - Credits  │  │             │  │                     │
│  - Jobs     │  │             │  │                     │
└─────────────┘  └─────────────┘  └─────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│                    MONGODB ATLAS                        │
│  - Edit Decision Lists (EDL)                            │
│  - Transcript data with flags                           │
│  - Dynamic editing metadata                             │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Pricing & Credit System

### 4.1 Plans

| Plan | Price | Credits | Features |
|------|-------|---------|----------|
| **Starter** | $30/month | 1,500 | 7 core features |
| **Pro** | $50/month | 3,000 | All 10 features |

### 4.2 Credit Costs per Feature

| Feature | Operation | Credits | Est. Cost to Us |
|---------|-----------|---------|-----------------|
| AI Cinematography | 5-sec video | 50 | $0.066 |
| Neural Dubbing | 1 min video | 15 | $0.018 |
| Performance Cloning | 1 min video | 12 | $0.015 |
| Synthetic Voice | 1 min audio | 2 | $0.002 |
| Diarization | 10 min audio | 5 | $0.008 |
| Sound Stage | 1 min audio | 8 | $0.010 |
| Script Supervision | 1 query | 3 | $0.004 |
| Gaze Redirection | 1 min video | 10 | $0.012 |
| Script Assistant | 1 query | 1 | $0.001 |
| Cloud Render | 1 min 1080p | 5 | $0.006 |

### 4.3 Feature Access by Plan

| Feature | Starter | Pro |
|---------|---------|-----|
| AI Cinematography | ❌ | ✅ |
| Neural Dubbing | ✅ | ✅ |
| Performance Cloning | ✅ | ✅ |
| Synthetic Voice | ✅ | ✅ |
| Diarization | ✅ | ✅ |
| Sound Stage | ✅ | ✅ |
| Script Supervision | ✅ | ✅ |
| Gaze Redirection | ❌ | ✅ |
| Script Assistant | ✅ | ✅ |
| Cloud Render | ❌ | ✅ |

---

## 5. Feature Specifications

### Feature 1: AI Cinematography (Text-to-Video)
- **Model**: Wan2.1-T2V-14B
- **License**: Apache 2.0
- **GPU**: A100-80GB
- **Input**: Text prompt (max 500 chars)
- **Output**: 5-second video clips at 720p
- **Plan**: Pro only

### Feature 2: Neural Dubbing (Lip Sync)
- **Model**: MuseTalk
- **License**: MIT
- **GPU**: A10G
- **Input**: Video + replacement audio
- **Output**: Lip-synced video
- **Plan**: Starter + Pro

### Feature 3: Performance Cloning
- **Model**: LivePortrait + MediaPipe
- **License**: Apache 2.0
- **GPU**: A10G/L4
- **Input**: Source image + driving video
- **Output**: Animated portrait video
- **Plan**: Starter + Pro

### Feature 4: Synthetic Voice (TTS)
- **Model**: F5-TTS
- **License**: Open
- **GPU**: L4/T4
- **Input**: Text + 10-sec reference audio
- **Output**: Cloned voice audio
- **Plan**: Starter + Pro

### Feature 5: Automated Diarization
- **Model**: Pyannote 3.1 + Whisper
- **License**: MIT
- **GPU**: A10G
- **Input**: Audio/video file
- **Output**: Transcript with speaker labels + timestamps
- **Plan**: Starter + Pro

### Feature 6: Sound Stage
- **Model**: AudioLDM-2
- **License**: Open
- **GPU**: A10G
- **Input**: Text prompt or audio to extend
- **Output**: Ambient audio track
- **Plan**: Starter + Pro

### Feature 7: Script Supervision
- **Model**: Qwen2.5-VL-7B
- **License**: Open
- **GPU**: A10G
- **Input**: Video + natural language query
- **Output**: Text answer with timestamps
- **Plan**: Starter + Pro

### Feature 8: Gaze Redirection
- **Model**: LivePortrait (retargeting)
- **License**: Apache 2.0
- **GPU**: A10G/L4
- **Input**: Video with off-camera gaze
- **Output**: Video with corrected gaze
- **Plan**: Pro only

### Feature 9: Script Assistant
- **Model**: Llama-3-70B via vLLM
- **License**: Open
- **GPU**: A100
- **Input**: Text prompt
- **Output**: Script suggestions, rewrites
- **Plan**: Starter + Pro

### Feature 10: Cloud Render
- **Technology**: FFmpeg on Cloud Run
- **Input**: Edit Decision List (EDL)
- **Output**: Rendered video file
- **Plan**: Pro only

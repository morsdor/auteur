# Session Context Guide

## 🎯 Purpose

This document helps you provide context to AI assistants in **new chat sessions** when implementing features for Auteur AI.

---

## 📋 What to Share in Each New Session

### 1. **Project Overview (Quick Copy-Paste)**

```
I'm building Auteur AI, an AI-powered video editing platform. It's a monorepo with:
- Desktop app (Electron + React + TypeScript)
- Web app (Next.js 14 + React + TypeScript)
- Backend API (Spring Boot 3.2, Java 21, deployed to GCP VM)
- Message queue (Apache Kafka on Confluent Cloud)
- GPU workers (Modal with Python for AI processing)

Tech stack: Turborepo + pnpm, shadcn/ui, dnd-kit, react-virtual, Zustand, React Query, Supabase (Auth+Postgres), MongoDB (EDL), Cloudflare R2 (storage).

Repo location: /Users/mritunjaymohitesh/dev/auteur
```

### 2. **Point to These Documents**

Always reference these files so the AI can read the full context:

**Essential:**
- `docs/requirements/00-tech-stack-summary.md` - Complete tech stack overview
- `docs/requirements/06-development-roadmap.md` - 20-week development plan
- `STATUS.md` - **Current implementation progress** (see below)

**For Technical Details:**
- `docs/requirements/03-technical-specifications.md` - API schemas, database tables
- `docs/requirements/07-kafka-architecture.md` - Kafka topics and message flows

**For User Stories:**
- `docs/requirements/02-user-stories-part1.md` - Features 1-8
- `docs/requirements/02-user-stories-part2.md` - Features 9-15

### 3. **Specify the Task**

Be specific about what you want to implement:

**Good:**
```
I want to implement US-4.1 (Generate Transcript).

Context:
- Backend: Spring Boot needs a POST /jobs/transcription endpoint
- It should publish to Kafka topic: jobs.requested
- Modal worker will consume from jobs.transcription
- See docs/requirements/07-kafka-architecture.md for the flow
- Current progress: See STATUS.md - backend API is set up, Kafka is configured
```

**Bad:**
```
Help me with transcription
```

---

## 📄 STATUS.md - The Most Important File

Create and maintain `STATUS.md` in the project root. Update it **after every feature** you complete.

### Template:

```markdown
# Auteur AI - Implementation Status

**Last Updated**: 2026-01-29  
**Current Phase**: Phase 1 - Monorepo Setup

---

## ✅ Completed

### Infrastructure
- [x] INFRA-0: Monorepo structure (Turborepo + pnpm)
  - [x] Configured pnpm workspaces
  - [x] Setup Turborepo pipeline
  - [x] Shared TypeScript/ESLint/Prettier configs
- [x] INFRA-0.1: Shared packages
  - [x] @auteur/types (all domain types)
  - [x] @auteur/utils (business logic)
  - [ ] @auteur/api-client (50% complete)
  - [ ] @auteur/auth (not started)
  - [ ] @auteur/storage (not started)

### Backend
- [ ] INFRA-1: Spring Boot API (not started)
- [ ] INFRA-3: Kafka configuration (not started)

### Frontend
- [ ] INFRA-0.2: shadcn/ui setup (not started)
- [ ] INFRA-0.3: Next.js web app (not started)
- [ ] INFRA-0.4: Electron desktop app (not started)

---

## 🚧 In Progress

**Current Work**: INFRA-0.1 - Completing @auteur/api-client package

**Blockers**: None

---

## 🎯 Next Up

1. Complete @auteur/api-client
2. Setup Spring Boot project (INFRA-1)
3. Configure Kafka producers/consumers (INFRA-3)

---

## 📝 Notes

- Using Java 21 LTS (not Java 17)
- Confluent Cloud cluster is in us-west-2
- GCP VM: e2-medium instance (not yet provisioned)
- All frontend packages using TypeScript strict mode
```

---

## 🔄 Workflow for Each New Session

### Step 1: Start the Session

Paste this template:

```
Hi! I'm working on Auteur AI.

Project: /Users/mritunjaymohitesh/dev/auteur

Please read these files first:
1. docs/requirements/00-tech-stack-summary.md
2. STATUS.md
3. docs/requirements/06-development-roadmap.md

Then help me with: [YOUR TASK]
```

### Step 2: After AI Reads Context

The AI will understand:
- ✅ Your tech stack
- ✅ What's already built
- ✅ What you're working on
- ✅ The overall architecture

### Step 3: After Completing Work

Update `STATUS.md`:
- Move completed items from 🚧 to ✅
- Update "In Progress" section
- Update "Next Up" section
- Add any notes/blockers

---

## 💡 Pro Tips

### For Large Features

Create a feature-specific document:

**Example: `docs/implementation/US-4.1-transcription.md`**
```markdown
# US-4.1: Generate Transcript - Implementation Notes

## Status: In Progress

## What's Done
- ✅ Spring Boot endpoint: POST /jobs/transcription
- ✅ Kafka producer configured
- ✅ Job Orchestrator routing

## In Progress
- 🚧 Modal worker (Whisper + Pyannote integration)

## Blockers
- Need to download Whisper model weights (10GB) to Modal volume

## Next Steps
1. Complete Modal worker
2. Add consumer in Spring Boot to update job status
3. Frontend UI to trigger transcription
```

Then in your next session:
```
Please read docs/implementation/US-4.1-transcription.md for context on what I've completed.
Now help me with: [next step]
```

### For Bug Fixes

Include:
- Error message
- Stack trace
- What you've tried
- Relevant file paths

### For New Features

Include:
- User story ID (e.g., US-6.2)
- Link to requirements: `docs/requirements/02-user-stories-part1.md`
- Dependencies (what must be built first)

---

## 🎬 Example Session Starters

### Session 1: Starting Monorepo
```
Hi! I'm starting a new project: Auteur AI video editing platform.

Location: /Users/mritunjaymohitesh/dev/auteur

Please read:
- docs/requirements/00-tech-stack-summary.md
- docs/requirements/06-development-roadmap.md

I want to start Phase 1, Week 1: Setup Turborepo + pnpm monorepo.
```

### Session 2: After Monorepo is Done
```
Hi! Continuing work on Auteur AI.

Location: /Users/mritunjaymohitesh/dev/auteur

Please read:
- STATUS.md (shows monorepo is complete)
- docs/requirements/00-tech-stack-summary.md

I want to create the @auteur/types package with all TypeScript definitions.
See docs/requirements/03-technical-specifications.md for database schemas.
```

### Session 15: Deep into Feature Implementation
```
Hi! Working on Auteur AI, specifically the Transcription feature.

Location: /Users/mritunjaymohitesh/dev/auteur

Please read:
- STATUS.md (shows backend is set up, Kafka is configured)
- docs/implementation/US-4.1-transcription.md (feature status)
- docs/requirements/07-kafka-architecture.md (Kafka flow)

I need help debugging the Modal worker. It's throwing:
[paste error message]
```

---

## 🚨 Critical Rules

1. **Always update STATUS.md** after completing work
2. **Always reference STATUS.md** in new sessions
3. **Be specific** about what you want to implement
4. **Include file paths** for context
5. **Mention blockers** if you're stuck

---

## 📂 Recommended File Structure

```
auteur/
├── STATUS.md ⭐ MOST IMPORTANT - Update after every feature
├── README.md (overview)
├── docs/
│   ├── requirements/ (read-only, reference)
│   └── implementation/ (create as needed for complex features)
│       ├── US-4.1-transcription.md
│       ├── US-7.1-clone-voice.md
│       └── INFRA-3-kafka-setup.md
└── [rest of project]
```

---

## ✅ Checklist for New Sessions

Before starting a new chat:

- [ ] Updated STATUS.md with latest progress
- [ ] Identified the specific task/user story
- [ ] Noted any blockers or errors
- [ ] Prepared file paths to reference
- [ ] Know which requirements docs are relevant

Then paste:
```
Hi! Working on Auteur AI (/Users/mritunjaymohitesh/dev/auteur).

Read: STATUS.md, docs/requirements/00-tech-stack-summary.md

Task: [be specific]
```

---

**Remember**: The AI has no memory between sessions. `STATUS.md` is your shared memory! 🧠

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

Read: 
- STATUS.md
- docs/requirements/00-tech-stack-summary.md  
- docs/requirements/03-technical-specifications.md

Task: Implement US-6.5 (Edit words in transcript)
```

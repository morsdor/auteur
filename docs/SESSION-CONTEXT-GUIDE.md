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
- STATUS.md @STATUS.md
- docs/requirements/00-tech-stack-summary.md   @00-tech-stack-summary.md
- docs/requirements/03-technical-specifications.md @03-technical-specifications.md

If you see in the @06-development-roadmap.md  we are at week 1.

And our task is INFRA 0 which is as below -

- [ ] Initialize monorepo with Turborepo
- [ ] Configure pnpm workspaces
- [ ] Create workspace structure (`packages/`, `apps/`, `backend/`)
- [ ] Setup Changesets for version management
- [ ] Configure shared `tsconfig.base.json`
- [ ] Configure shared ESLint and Prettier configs
- [ ] Create shared Tailwind CSS config
- [ ] Setup husky for pre-commit hooks


Let us start working on them.

Ask me if you need any clarifiactions and as you progress, keep updating @STATUS.md

```

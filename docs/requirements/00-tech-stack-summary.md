# Auteur AI - Tech Stack Summary

## 📋 Finalized Technology Stack

This document summarizes the complete, approved technology stack for the Auteur AI video editing platform.

---

## Frontend Stack

### Monorepo Management

- **Tool**: Turborepo
- **Package Manager**: pnpm workspaces
- **Why**: Industry-standard monorepo with excellent caching, 80% code reuse between desktop and web

### Shared Packages (@auteur/\*)

| Package              | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `@auteur/ui`         | shadcn/ui components + custom video editing components        |
| `@auteur/api-client` | Type-safe REST API client for Spring Boot backend             |
| `@auteur/types`      | Shared TypeScript definitions                                 |
| `@auteur/utils`      | Business logic (EDL parsing, credit calculations, validation) |
| `@auteur/auth`       | Auth abstraction (Electron vs Web storage)                    |
| `@auteur/storage`    | Storage adapter (electron-store vs IndexedDB)                 |

### Desktop App (Electron)

- **Framework**: Electron 28+
- **UI**: React 18 + TypeScript
- **Component Library**: **shadcn/ui** (Radix UI + Tailwind primitives)
- **State Management**: **Zustand** (lightweight, simple)
- **Server State**: **React Query** (TanStack Query for API caching)
- **Styling**: **Tailwind CSS**
- **Build**: Vite
- **Auth**: Supabase JS + electron-store

### Web App (Next.js)

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Component Library**: **shadcn/ui** (same components as desktop)
- **State Management**: **Zustand** (same patterns as desktop)
- **Server State**: **React Query** (same patterns as desktop)
- **Styling**: **Tailwind CSS** (shared config)
- **Storage**: IndexedDB via Dexie
- **Auth**: Supabase JS

### Specialized UI Libraries

| Library                     | Purpose                         | Why                                                        |
| --------------------------- | ------------------------------- | ---------------------------------------------------------- |
| **dnd-kit**                 | Timeline clip drag-and-drop     | Performance-first, works with virtualization               |
| **@tanstack/react-virtual** | Virtualized timeline rendering  | Handle 1000s of clips without lag                          |
| **react-resizable-panels**  | VS Code-style panel resizing    | Professional UX for window management                      |
| **Tiptap**                  | Rich text editor for transcript | **Core feature**: Edit text → edit video (Descript-killer) |
| **lucide-react**            | Icon library                    | Clean, sharp, consistent icons                             |

> **Note**: Tiptap is used for the core text-based editing feature - users edit the transcript and AI automatically regenerates speech and updates the video. This is the primary differentiator from traditional video editors.

---

## Backend Stack

### API Layer

- **Language**: **Java 21 LTS**
- **Framework**: **Spring Boot 3.2**
- **API**: Spring Web (REST with @RestController)
- **Validation**: Jakarta Validation
- **Auth**: Spring Security + Supabase JWT verification
- **Migrations**: **Flyway** (SQL-based schema versioning)
- **Testing**: JUnit 5, Mockito, TestContainers (real Postgres/Redis/MongoDB in tests)
- **Build**: Maven
- **Hosting**: **Hetzner VPS** (Docker Compose)

### Message Queue

- **Platform**: **Redis** (Self-hosted)
- **Technology**: **Redis Streams**
- **Persistence**: AOF (Append Only File)
- **Role**: Replaces Kafka for the MVP
- **Consumers**: Spring Boot (Java) + Modal (Python)
- **Why**: Simpler, lower cost, sufficient for MVP scale

### GPU Compute

- **Platform**: **Modal** (Serverless Python GPUs)
- **GPUs**: A100-80GB, A10G, L4/T4
- **Runtime**: Python 3.10+ with PyTorch + CUDA
- **Workers**: Redis Stream consumers that process AI jobs
- **Why**: On-demand GPUs, automatic scaling, no infrastructure management

---

## Data Layer

### Authentication + SQL

- **Provider**: **Supabase**
- **Auth**: Email + Google + GitHub OAuth
- **Database**: PostgreSQL 15
- **Tables**: users, subscriptions, credits, projects, media_files, jobs, etc.
- **Why**: Built-in auth, generous free tier, great DX

### Document Store (EDL)

- **Database**: **MongoDB Atlas**
- **Cluster**: M10 (production), M0 (free for dev)
- **Use Case**: Edit Decision Lists (dynamic, nested structure)
- **Why**: Schema flexibility for timeline data structure

### File Storage

- **Service**: **Cloudflare R2**
- **Protocol**: S3-compatible
- **Why**: **Zero egress/ingress costs** (huge savings vs S3)
- **CDN**: Cloudflare's global network

---

## DevOps

### CI/CD

- **Primary**: **GitHub Actions**
  - Frontend: Lint, typecheck, test monorepo
  - Backend: Maven test, build Docker image
  - Registry: **GitHub Container Registry (GHCR)**
  - Deploy: SSH to Hetzner VPS, `docker compose pull && up`
- **Future**: specialized CI runners

### Testing

| Layer         | Tools                                     |
| ------------- | ----------------------------------------- |
| Frontend Unit | Vitest                                    |
| Backend Unit  | JUnit 5 + Mockito                         |
| Integration   | TestContainers (Postgres, Redis, MongoDB) |
| E2E           | Playwright (desktop + web)                |
| API           | Postman/Bruno                             |

### Deployment

- **Infrastructure**: Docker Compose on Hetzner VPS
- **Proxy**: Caddy (Automatic HTTPS)
- **Desktop**: Self-distributed (code-signed Electron builds)

---

## Architecture Patterns

### Event-Driven Job Processing

```
User (Desktop/Web)
    ↓ POST /jobs/transcription
Spring Boot API
    ├─ Deduct credits (Postgres transaction)
    └─ Add to Stream: jobs:requested (Redis)
                ↓
        Redis (Hetzner VPS)
                ↓
        ┌───────┴────────┐
        ▼                ▼
Job Orchestrator    Modal Workers
(Spring Link)       (Python Redis Consumers)
    ├─ Route job        ├─ Download from R2
    └─ Publish to:      ├─ Run AI model (GPU)
       jobs:{type}      ├─ Upload result to R2
                        └─ Ack & Publish: jobs:completed
                                ↓
                        Spring Boot Consumer
                                ↓
                        Update job status (Postgres)
                                ↓
                            Notify user
```

### Monorepo Code Sharing (80% Reuse)

```
packages/ui (shadcn/ui + custom components)
    ↓                       ↓
apps/desktop            apps/web
(Electron)              (Next.js)
    ↓                       ↓
    └───────────────────────┘
                ↓
    Spring Boot API (Java 21)
                ↓
        ┌───────┴────────┐
        ▼                ▼
    Supabase         Redis
    (Auth+Postgres)  (Jobs)
                        ↓
                    Modal (GPUs)
```

---

## Cost Estimate (Monthly)

| Service            | Tier                          | Cost                |
| ------------------ | ----------------------------- | ------------------- |
| Hetzner VPS (CX22) | 4 vCPU, 8GB RAM               | ~$9                 |
| Redis              | Self-hosted on VPS            | $0                  |
| Modal              | Pay-per-use (A10G @ $0.60/hr) | ~$20-60 (varies)    |
| Supabase           | Pro                           | $25                 |
| MongoDB Atlas      | M10                           | ~$60                |
| Cloudflare R2      | Storage only                  | ~$10                |
| **Total**          |                               | **~$120-165/month** |

> **Note**: Modal has $30/month free credits. Hetzner is very cost effective.

---

## Why This Stack?

### Learning Goals Met ✅

- ✅ **Enterprise Java**: Spring Boot is #1 skill for backend jobs
- ✅ **Event Streaming**: Kafka is industry standard at scale
- ✅ **Cloud Native**: GCP, serverless GPUs, managed databases
- ✅ **Modern Frontend**: React 18, Turborepo, shadcn/ui, TypeScript strict mode
- ✅ **Full-Stack**: TypeScript ↔ Java ↔ Python (3 ecosystems)

### Production-Ready ✅

- ✅ All technologies have active communities and commercial support
- ✅ Apache 2.0 or permissive licenses for all AI models
- ✅ Scalable architecture (can handle 1000s of users)
- ✅ Secure by default (Spring Security, Supabase RLS, Kafka TLS)

### Cost-Effective ✅

- ✅ Cloudflare R2 saves $100s/month vs S3
- ✅ GCP free tier for API hosting
- ✅ Modal pay-per-use (no idle GPU costs)
- ✅ Generous free tiers for development

---

## Next Steps

1. **Review**: Confirm this stack aligns with your goals
2. **Setup**: Follow [Development Roadmap](./06-development-roadmap.md) starting with Phase 1, Week 1
3. **Learn**: Each technology has official docs + excellent community resources

---

## Reference Documents

- [Product Requirements](./01-product-requirements.md)
- [Technical Specifications](./03-technical-specifications.md)
- [Redis Architecture](./07-redis-architecture.md)
- [Development Roadmap](./06-development-roadmap.md)
- [GitHub Issues (Monorepo)](./05a-github-issues-monorepo.md)

---

**Status**: ✅ Tech Stack Finalized - Ready to Build!  
**Last Updated**: 2026-01-29

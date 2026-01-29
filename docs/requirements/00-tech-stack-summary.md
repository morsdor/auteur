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
- **Testing**: JUnit 5, Mockito, TestContainers (real Postgres/Kafka/MongoDB in tests)
- **Build**: Maven
- **Hosting**: **GCP Compute Engine** (e2-medium, free tier)

### Message Queue

- **Platform**: **Apache Kafka** via **Confluent Cloud**
- **Cluster**: Basic tier (us-west-2)
- **Producer**: Spring Kafka (Java)
- **Consumers**: Spring Kafka (Java) + confluent-kafka (Python for Modal)
- **Serialization**: **Avro** with Schema Registry
- **Topics**: 14 topics (jobs._, analytics._)
- **Why**: Industry-standard event streaming, perfect for async job processing

### GPU Compute

- **Platform**: **Modal** (Serverless Python GPUs)
- **GPUs**: A100-80GB, A10G, L4/T4
- **Runtime**: Python 3.10+ with PyTorch + CUDA
- **Workers**: Kafka consumers that process AI jobs
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
  - Backend: Maven test, build JAR
  - Deploy: SSH to GCP VM, deploy Modal functions
- **Future**: Jenkins (for learning enterprise CI/CD in Phase 7)

### Testing

| Layer         | Tools                                     |
| ------------- | ----------------------------------------- |
| Frontend Unit | Vitest                                    |
| Backend Unit  | JUnit 5 + Mockito                         |
| Integration   | TestContainers (Postgres, Kafka, MongoDB) |
| E2E           | Playwright (desktop + web)                |
| API           | Postman/Bruno                             |

### Deployment

- **API**: systemd service on GCP Compute Engine
- **SSL**: Let's Encrypt (Certbot)
- **Desktop**: Self-distributed (code-signed Electron builds)
- **Web**: Vercel or GCP Cloud Run (TBD in Phase 7)

---

## Architecture Patterns

### Event-Driven Job Processing

```
User (Desktop/Web)
    ↓ POST /jobs/transcription
Spring Boot API
    ├─ Deduct credits (Postgres transaction)
    └─ Publish JobRequestedEvent → Kafka
                ↓
        Kafka (Confluent Cloud)
                ↓
        ┌───────┴────────┐
        ▼                ▼
Job Orchestrator    Modal Workers
(Spring Consumer)   (Python Kafka Consumers)
    ├─ Route job        ├─ Download from R2
    └─ Publish to:      ├─ Run AI model (GPU)
       jobs.{type}      ├─ Upload result to R2
                        └─ Publish JobCompletedEvent → Kafka
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
    Supabase         Kafka
    (Auth+Postgres)  (Jobs)
                        ↓
                    Modal (GPUs)
```

---

## Cost Estimate (Monthly)

| Service                 | Tier                          | Cost               |
| ----------------------- | ----------------------------- | ------------------ |
| GCP Compute Engine      | e2-medium (free tier)         | $0                 |
| Kafka (Confluent Cloud) | Basic cluster                 | ~$110              |
| Modal                   | Pay-per-use (A10G @ $0.60/hr) | ~$50-200 (varies)  |
| Supabase                | Pro                           | $25                |
| MongoDB Atlas           | M10                           | ~$60               |
| Cloudflare R2           | Storage only                  | ~$10               |
| **Total**               |                               | **$255-405/month** |

> **Note**: GCP free tier gives $300 credit for 90 days, Kafka has free tier option ($0 with limits), Modal has $30/month free credits

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
- [Kafka Architecture](./07-kafka-architecture.md)
- [Development Roadmap](./06-development-roadmap.md)
- [GitHub Issues (Monorepo)](./05a-github-issues-monorepo.md)

---

**Status**: ✅ Tech Stack Finalized - Ready to Build!  
**Last Updated**: 2026-01-29

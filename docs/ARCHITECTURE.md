# Auteur AI - Architecture & Deployment Guide

## 1. System Overview

Auteur AI is a video creation platform built on a modern microservices architecture. It is designed for low operational costs (~$60/mo) while being scalable to 10k+ users. The system leverages a **Hybrid Cloud** approach:

- **Core Services:** Hosted on a low-cost Hetzner VPS (Docker Compose).
- **Managed Services:** Database, Auth, and Storage are offloaded to specialized providers (Supabase, MongoDB, Cloudflare).
- **Compute:** GPU workloads (AI processing) run on-demand via Modal.

### High-Level Architecture

```
                        ┌──────────────────────────┐
                        │       USERS              │
                        │  (Desktop App + Web)     │
                        └────────────┬─────────────┘
                                     │ HTTPS
                                     ▼
┌────────────────────────────────────────────────────────────┐
│              Hetzner VPS CX22 (8GB RAM, 2 vCPU)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Caddy Reverse Proxy                       │  │
│  │  - Automatic SSL (Let's Encrypt)                     │  │
│  │  - Routes traffic to Frontend & Backend              │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                  │
│         ┌───────────────┴───────────────┐                  │
│         ▼                               ▼                  │
│  ┌─────────────────┐          ┌──────────────────┐         │
│  │   Next.js       │          │  Spring Boot     │         │
│  │   Frontend      │◄────────►│  REST API        │         │
│  └─────────────────┘          └────────┬─────────┘         │
│                                        │                   │
│                              ┌──────────────────┐          │
│                              │     Redis        │          │
│                              │  (Queue/Cache)   │          │
│                              └──────────────────┘          │
└─────────────────────────────────────┬──────────────────────┘
                                      │
     ┌───────────────┬────────────────┼──────────────┐
     ▼               ▼                ▼              ▼
┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌─────────┐
│ Supabase │  │   MongoDB    │  │ Cloudflare │  │  Modal  │
│ (Postgres│  │    Atlas     │  │     R2     │  │  (GPU)  │
│  + Auth) │  │    (EDL)     │  │  (Storage) │  │         │
└──────────┘  └──────────────┘  └────────────┘  └─────────┘
```

---

## 2. Core Components

### Frontend (Next.js)

- **Tech:** Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui.
- **Role:** Main user interface, editor, API consumer.
- **Port:** 3000 (Internal).

### Backend (Spring Boot)

- **Tech:** Java 21, Spring Boot 3.2, Spring Security.
- **Role:** Business logic, authentication, credit deduction, job orchestration.
- **Port:** 8080 (Internal).

### Redis (Job Queue & Cache)

- **Role:** Replaces Kafka for the MVP. Handles:
  - **Job Queue:** Uses **Redis Streams** to dispatch AI jobs.
  - **Caching:** User credits, rate limits, session data.
- **Port:** 6379 (Internal).

### Caddy (Reverse Proxy)

- **Role:** Entry point for all traffic.
- **Features:** Automatic HTTPS (Let's Encrypt), zero-config SSL.
- **Ports:** 80 (HTTP) -> 443 (HTTPS).

---

## 3. External Managed Services

These services are external to the VPS to reduce operational overhead:

| Service           | Purpose              | Features Used                                    |
| ----------------- | -------------------- | ------------------------------------------------ |
| **Supabase**      | Relational DB & Auth | Postgres, Row Level Security (RLS), User Tables. |
| **MongoDB Atlas** | Document Store       | Storing complex Edit Decision Lists (EDLs).      |
| **Cloudflare R2** | Object Storage       | Zero egress fees. Stores raw video & AI outputs. |
| **Modal**         | GPU Compute          | On-demand A100/A10G GPUs for running AI models.  |

---

## 4. Job Processing Flow

This flow describes how an AI action (e.g., "Lip Sync") is processed:

1.  **User Request:** User clicks "Generate" on Frontend.
2.  **API Validation:** Spring Boot validates JWT and checks Credit Balance in Postgres.
3.  **Deduction:** Credits are reserved/deducted.
4.  **Queueing:** Job details are added to the **Redis Stream** (`jobs:requested`).
5.  **Processing (Modal):**
    - A Python worker on Modal listens to the Redis Stream.
    - Downloads input assets from **Cloudflare R2**.
    - Runs the AI model on a GPU.
    - Uploads the result back to R2.
    - Acknolwedges key in Redis (`jobs:completed`).
6.  **Completion:** Spring Boot detects completion, updates Job Status in Postgres, and notifies the user via WebSocket/Polling.

---

## 5. Deployment & CI/CD

We use **GitHub Actions** for a fully automated pipeline.

### The Pipeline (`ci-cd.yml`)

1.  **Push:** Code is pushed to `main` branch.
2.  **Build:** Docker images for Frontend and Backend are built. (Frontend uses `turbo prune` for speed).
3.  **Publish:** Images are pushed to **GitHub Container Registry (GHCR)**.
4.  **Deploy:** The pipeline SSHs into the Hetzner VPS and runs:
    ```bash
    docker compose pull
    docker compose up -d
    ```

### Infrastructure Setup (Hetzner VPS)

- **OS:** Ubuntu 24.04 LTS.
- **Security:** UFW Firewall (allow 80, 443, 22), Fail2Ban installed.
- **Config:** A `.env` file at `/opt/auteur/.env` stores all secrets.

---

## 6. Commands & Operations

### Local Development

Start the full stack locally:

```bash
# Start infrastructure (Redis, Database simulators if needed)
docker compose -f docker-compose.dev.yml up -d

# Run Backend (Terminal 1)
cd backend/api && mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Run Frontend (Terminal 2)
pnpm dev --filter=web
```

### Production Operations (on VPS)

All commands are run from `/opt/auteur`.

**View Logs:**

```bash
docker compose logs -f          # All logs
docker compose logs -f backend  # Just backend
```

**Check Status:**

```bash
docker compose ps
docker stats
```

**Restart a Service:**

```bash
docker compose restart caddy
```

**Manual Update:**

```bash
./deploy.sh
# OR manually:
docker compose pull && docker compose up -d
```

---

## 7. Cost & Scaling

### Current MVP Costs (~$60-110/mo)

- **Hetzner VPS (CX22):** ~$9/mo (8GB RAM).
- **Supabase/Mongo/R2:** Free Tiers.
- **Modal GPU:** ~$50-100/mo (Scaled by usage).
- **Redis:** $0 (Self-hosted).

### Scaling Path

1.  **Phase 1 (MVP):** Single VPS. Redis Streams for queue.
2.  **Phase 2 (Growth):** Upgrade VPS (CX32). Upgrade Managed DB plans.
3.  **Phase 3 (Scale):** Migrate Queue from Redis to **Kafka**. Add Load Balancer.

---

**Status:** ✅ Production Ready  
**Docs Location:** `docs/ARCHITECTURE.md`

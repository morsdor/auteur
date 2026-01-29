# Auteur AI

> Enterprise-grade AI video editing platform for Desktop and Web

## 🎯 Project Overview

Auteur is a **monorepo** containing desktop (Electron) and web (Next.js) applications that share 80% of their codebase. It leverages serverless GPU infrastructure (Modal) to democratize access to state-of-the-art AI video editing capabilities.

## 📦 Monorepo Structure

```
auteur/
├── apps/
│   ├── desktop/        # Electron desktop app
│   └── web/            # Next.js web app
├── packages/
│   ├── ui/             # Shared React components (@auteur/ui)
│   ├── api-client/     # REST API client (@auteur/api-client)
│   ├── types/          # TypeScript types (@auteur/types)
│   ├── utils/          # Business logic (@auteur/utils)
│   ├── auth/           # Auth abstraction (@auteur/auth)
│   └── storage/        # Storage adapter (@auteur/storage)
├── backend/
│   ├── api/            # Spring Boot (Java 21)
│   └── gpu/            # Modal GPU workers (Python)
└── docs/
    └── requirements/   # Product requirements and specs
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (install: `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Start development (both desktop and web)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm typecheck
```

## 🏗️ Technology Stack

| Layer             | Technology                                                 |
| ----------------- | ---------------------------------------------------------- |
| **Monorepo**      | Turborepo + pnpm workspaces                                |
| **Desktop**       | Electron + React + TypeScript                              |
| **Web**           | Next.js 14 (App Router) + React + TypeScript               |
| **UI Components** | shadcn/ui (Radix UI + Tailwind)                            |
| **State**         | Zustand + React Query (TanStack Query)                     |
| **Styling**       | Tailwind CSS (shared config)                               |
| **Timeline**      | dnd-kit + @tanstack/react-virtual + react-resizable-panels |
| **Text Editor**   | Tiptap (for transcript editing)                            |
| **Icons**         | lucide-react                                               |
| **API**           | Spring Boot 3.2 (Java 21) on GCP Compute Engine            |
| **Queue**         | Apache Kafka (Confluent Cloud)                             |
| **GPU**           | Modal (serverless Python GPUs)                             |
| **Migrations**    | Flyway                                                     |
| **Auth**          | Supabase Auth                                              |
| **Database**      | PostgreSQL (Supabase)                                      |
| **NoSQL**         | MongoDB Atlas (for EDL)                                    |
| **Storage**       | Cloudflare R2 (zero egress costs)                          |
| **CI/CD**         | GitHub Actions                                             |
| **Testing**       | JUnit 5, Mockito, TestContainers, Playwright               |

## 🎨 AI Features

1. **AI Cinematography** - Text-to-video generation (Wan2.1)
2. **Neural Dubbing** - Lip synchronization (MuseTalk)
3. **Performance Cloning** - Face animation (LivePortrait)
4. **Synthetic Voice** - Text-to-speech (F5-TTS)
5. **Diarization** - Speaker identification (Pyannote + Whisper)
6. **Sound Stage** - Ambient audio generation (AudioLDM-2)
7. **Script Supervision** - Video understanding (Qwen2.5-VL)
8. **Gaze Redirection** - Eye contact correction (LivePortrait)
9. **Script Assistant** - LLM writing help (Llama-3-70B)
10. **Cloud Render** - Server-side rendering (FFmpeg)

## 📚 Documentation

**Quick Start:**

- [Tech Stack Summary](./docs/requirements/00-tech-stack-summary.md) ⭐ **Start Here**
- [Development Roadmap](./docs/requirements/06-development-roadmap.md)

**Requirements:**

- [Product Requirements](./docs/requirements/01-product-requirements.md)
- [User Stories Part 1](./docs/requirements/02-user-stories-part1.md)
- [User Stories Part 2](./docs/requirements/02-user-stories-part2.md)
- [Technical Specifications](./docs/requirements/03-technical-specifications.md)
- [Kafka Architecture](./docs/requirements/07-kafka-architecture.md)
- [Non-Functional Requirements](./docs/requirements/04-non-functional-requirements.md)

**Implementation:**

- [GitHub Issues](./docs/requirements/05-github-issues.md)
- [Monorepo Infrastructure Tasks](./docs/requirements/05a-github-issues-monorepo.md)

## 🛠️ Development Workflow

### Working on Shared Packages

```bash
# Navigate to a package
cd packages/ui

# Run in dev mode (with hot reload)
pnpm dev
```

### Working on Apps

```bash
# Desktop app
cd apps/desktop
pnpm dev

# Web app
cd apps/web
pnpm dev
```

### Adding Dependencies

```bash
# Add to root (affects all packages)
pnpm add -w <package>

# Add to specific package
pnpm --filter @auteur/ui add <package>

# Add to desktop app
pnpm --filter desktop add <package>
```

## 🧪 Testing Strategy

- **Unit Tests**: Vitest for shared packages
- **Component Tests**: Storybook + Vitest for UI components
- **E2E Tests**: Playwright for desktop and web apps
- **Integration Tests**: Pytest for backend

## 📝 Commit Convention

We use conventional commits:

```
feat: add transcription feature
fix: resolve timeline scrubbing issue
docs: update API documentation
chore: bump dependencies
```

## 🔒 Security

- Desktop: Context isolation + ContextBridge
- Web: Strict CSP + HTTPS only
- API: JWT verification + rate limiting
- Data: Row-level security + encryption at rest

## 📄 License

This project is proprietary software. All models used are Apache 2.0 or MIT licensed.

## 🤝 Contributing

This is a learning project. See [Development Roadmap](./docs/requirements/06-development-roadmap.md) for current phase.

---

**Status**: ✅ Requirements Complete - Ready for Implementation  
**Current Phase**: Phase 1 - Monorepo Setup (Week 1-5)  
**See**: [Development Roadmap](./docs/requirements/06-development-roadmap.md) for detailed plan

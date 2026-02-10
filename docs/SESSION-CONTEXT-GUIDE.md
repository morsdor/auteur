I'm building Auteur AI, an AI-powered video editing platform. It's a monorepo with:

- Desktop app (Electron + React + TypeScript)
- Web app (Next.js 16 + React + TypeScript)
- Backend API (Spring Boot 3.2, Java 21, deployed to GCP VM)
- Message queue (Apache Kafka on Confluent Cloud)
- GPU workers (Modal with Python for AI processing)

Tech stack: Turborepo + pnpm, shadcn/ui, dnd-kit, react-virtual, Zustand, React Query, Supabase (Auth+Postgres), MongoDB (EDL), Cloudflare R2 (storage).

Repo location: /Users/mritunjaymohitesh/dev/auteur

Read:

- STATUS.md @STATUS.md
- docs/requirements/00-tech-stack-summary.md @00-tech-stack-summary.md
- docs/requirements/03-technical-specifications.md @03-technical-specifications.md
- docs/design/ui-design-system.md @ui-design-system.md
- docs/ARCHITECTURE.md @ARCHITECTURE.md

If you see in the @06-development-roadmap.md we are at Phase 2.

This is task related to US 1.1

**As a** new user  
**I want to** create an account using email or OAuth  
**So that** I can access Auteur's features

**Acceptance Criteria:**

- [ ] User can register with email/password
- [ ] User can register with Google OAuth
- [ ] User can register with GitHub OAuth
- [ ] Email verification is required for email signups
- [ ] Password must be min 8 chars with 1 number and 1 special char
- [ ] Duplicate email detection with clear error message

**Technical Tasks:**

- [ ] Configure Supabase Auth providers
- [ ] Create registration API endpoint on Cloud Run
- [ ] Implement email verification flow
- [ ] Create user record in Postgres on successful registration
- [ ] Initialize credit balance (0 for free tier)

Constraints -
Before writing any new type, check if it already exists in @auteur/types package or if it can be added to @auteur/types package.
Same goes with business utilities as in @auteur/utils package.
Same goes with storage as in @auteur/storage package.
Same goes with auth as in @auteur/auth package.
Same goes with api-client as in @auteur/api-client package.

Create common ui and common components acroos web and eletectron in @auteur/ui package.
Use shadcn/ui for common components. Downgrade to taliwind v3 because v4 has issues wih monorepo

Let us start working on them.

Ask me if you need any clarifications and as you progress, keep updating @STATUS.md
Think like a mid to senior software engineer and use appropriate tone and language and technical details. Give code snippets wherever required.
Save each of that thread in a new md file in @twitter folder

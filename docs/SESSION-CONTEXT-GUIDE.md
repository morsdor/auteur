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

This is task related to US 1.2 : User Login

**Acceptance Criteria:**

- [ ] User can login with email/password
- [ ] User can login with Google/GitHub OAuth
- [ ] JWT token stored securely in Electron
- [ ] Session persists across app restarts
- [ ] Clear error messages for invalid credentials
- [ ] Rate limiting on failed login attempts (5 per minute)

**Technical Tasks:**

- [ ] Implement Supabase Auth in Electron main process
- [ ] Store JWT in secure electron-store
- [ ] Implement token refresh logic
- [ ] Create auth context for React components

Some of the point here might alreday be created. check before adding any new code

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

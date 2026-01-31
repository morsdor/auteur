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

If you see in the @06-development-roadmap.md we are at week 2.

This is task related to Infra 0.3

- [ ] Initialize Next.js 16(latest) with App Router
- [ ] Configure TypeScript
- [ ] Configure Tailwind CSS (shared config)
- [ ] Setup Zustand state management
- [ ] Integrate Supabase Auth (web version)
- [ ] Setup IndexedDB storage with Dexie
- [ ] Configure PWA with next-pwa
- [ ] Setup environment variables (.env.local)
- [ ] Create app layout and routing structure

Constraints -
Before writing any new type, check if it already exists in @auteur/types package or if it can be added to @auteur/types package.
Same goes with business utilities as in @auteur/utils package.
Same goes with storage as in @auteur/storage package.
Same goes with auth as in @auteur/auth package.
Same goes with api-client as in @auteur/api-client package.

Let us start working on them.

Ask me if you need any clarifications and as you progress, keep updating @STATUS.md

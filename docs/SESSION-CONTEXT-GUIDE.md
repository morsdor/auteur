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

If you see in the @06-development-roadmap.md we are at Phase 1.

This is task related to Infra 6

I have already created a R2 bucket. S3 api - https://55f7c26cd54a4bbe5cebf864d5fe82e4.r2.cloudflarestorage.com/auteur
name- auteur

- [ ] Configure CORS for uploads
- [ ] Setup presigned URL generation
- [ ] Configure lifecycle rules

Constraints -
Before writing any new type, check if it already exists in @auteur/types package or if it can be added to @auteur/types package.
Same goes with business utilities as in @auteur/utils package.
Same goes with storage as in @auteur/storage package.
Same goes with auth as in @auteur/auth package.
Same goes with api-client as in @auteur/api-client package.

Let us start working on them.

Ask me if you need any clarifications and as you progress, keep updating @STATUS.md

## TWITTER GENERATION PROMPT

### Part 1

Now based on the above context and conversation history related to this chat session only, suggest me some ideas to create Twitter threads.
The ideas should focus on what we learnt in this chat session. Architectural decisions and why they were made. Tradeoffs. Performance. Security. Scalability, etc.
But relevant to this chat session and the user story that we were working here

### Part 2

Create me a twitter thread of 6-10 highly informative tweets on the best 3 tweet threads (your recommendation )
Think like a mid to senior software engineer and use appropriate tone and language and technical details. Give code snippets wherever required.
Save each of that thread in a new md file in @twitter folder

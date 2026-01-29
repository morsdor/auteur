# Auteur AI - GitHub Issues: Monorepo Infrastructure

> Add these infrastructure tasks **BEFORE** the existing INFRA issues in the 05-github-issues.md file

---

## Monorepo Infrastructure Issues

### INFRA-0: Setup Monorepo Structure
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Initialize monorepo with Turborepo
- [ ] Configure pnpm workspaces
- [ ] Create workspace structure (`packages/`, `apps/`, `backend/`)
- [ ] Setup Changesets for version management
- [ ] Configure shared `tsconfig.base.json`
- [ ] Configure shared ESLint and Prettier configs
- [ ] Create shared Tailwind CSS config
- [ ] Setup husky for pre-commit hooks

---

### INFRA-0.1: Create Shared Packages
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Create `@auteur/types` package
  - [ ] Define API types
  - [ ] Define EDL types
  - [ ] Define user/project types
- [ ] Create `@auteur/api-client` package
  - [ ] Setup typed fetch wrapper
  - [ ] Implement all API endpoints
  - [ ] Add retry logic and error handling
- [ ] Create `@auteur/utils` package
  - [ ] EDL parsing functions
  - [ ] Credit calculation logic
  - [ ] Time formatting utilities
- [ ] Create `@auteur/auth` package
  - [ ] Abstract auth provider interface
  - [ ] Supabase integration
  - [ ] Token management
- [ ] Create `@auteur/storage` package
  - [ ] Storage adapter interface
  - [ ] Electron adapter (electron-store)
  - [ ] Web adapter (IndexedDB via Dexie)

---

### INFRA-0.2: Create @auteur/ui Package
**Labels:** `infrastructure`, `priority:high`, `size:XL`

- [ ] Setup React + TypeScript package
- [ ] Configure Tailwind CSS
- [ ] Create core components:
  - [ ] Timeline editor
  - [ ] Timeline track
  - [ ] Timeline clip
  - [ ] Video preview player
  - [ ] Media library (grid/list views)
  - [ ] Project card
  - [ ] Transcript viewer
  - [ ] Job progress indicator
  - [ ] Credit display
- [ ] Setup Storybook for component development
- [ ] Add component tests with Vitest

---

### INFRA-0.3: Setup Next.js Web App
**Labels:** `infrastructure`, `priority:high`, `size:L`

- [ ] Initialize Next.js 14 with App Router
- [ ] Configure TypeScript
- [ ] Import `@auteur/ui` components
- [ ] Configure Tailwind CSS (shared config)
- [ ] Setup Zustand state management
- [ ] Integrate Supabase Auth (web version)
- [ ] Setup IndexedDB storage with Dexie
- [ ] Configure PWA with next-pwa
- [ ] Setup environment variables (.env.local)
- [ ] Create app layout and routing structure

---

### INFRA-0.4: Update Electron App for Monorepo
**Labels:** `infrastructure`, `priority:medium`, `size:M`

- [ ] Restructure as `apps/desktop`
- [ ] Import `@auteur/ui` components
- [ ] Use `@auteur/api-client` instead of direct fetch
- [ ] Replace inline auth with `@auteur/auth`
- [ ] Replace inline storage with `@auteur/storage`
- [ ] Update build scripts for monorepo
- [ ] Configure electron-builder for packaging

---

### INFRA-0.5: Setup Shared Development Scripts
**Labels:** `infrastructure`, `priority:medium`, `size:M`

- [ ] Create `turbo.json` pipeline config
- [ ] Add `dev` script (runs both desktop and web)
- [ ] Add `build` script (builds all packages)
- [ ] Add `lint` script (lints entire monorepo)
- [ ] Add `test` script (runs all tests)
- [ ] Add `changeset` script for version bumps
- [ ] Add `typecheck` script for TypeScript validation

---

## Updated Infrastructure Numbering

After adding the above, renumber existing INFRA tasks:

- **INFRA-1** → **INFRA-1**: Setup Electron + React Project (becomes part of INFRA-0.4)
- **INFRA-2** → **INFRA-2**: Setup Cloud Run API (unchanged)
- **INFRA-3** → **INFRA-3**: Setup Modal Backend (unchanged)
- **INFRA-4** → **INFRA-4**: Setup Supabase (unchanged)
- **INFRA-5** → **INFRA-5**: Setup MongoDB Atlas (unchanged)
- **INFRA-6** → **INFRA-6**: Setup Cloudflare R2 (unchanged)
- **INFRA-7** → **INFRA-7**: Setup CI/CD Pipeline (add web app deployment)
- **INFRA-8** → **INFRA-8**: Setup Stripe Integration (unchanged)

---

## Updated INFRA-7: CI/CD for Monorepo
**Labels:** `infrastructure`, `priority:medium`, `size:L`

- [ ] GitHub Actions for Electron build (Windows, macOS, Linux)
- [ ] GitHub Actions for Next.js web build
- [ ] Deploy web app to Vercel or Cloud Run
- [ ] GitHub Actions for Cloud Run API deploy
- [ ] GitHub Actions for Modal deploy
- [ ] Configure staging/production environments for web
- [ ] Setup Electron auto-update (electron-updater)
- [ ] Configure Turborepo remote caching

---

## Suggested Additional Labels

Add these to the existing label list:

| Label | Color | Description |
|-------|-------|-------------|
| `monorepo` | #5319e7 | Monorepo infrastructure |
| `shared-package` | #bfdbfe | Shared package work |
| `desktop-only` | #fbbf24 | Desktop-specific code |
| `web-only` | #34d399 | Web-specific code |

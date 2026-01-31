# Auteur AI - Web App

Next.js 16 web application for Auteur AI video editing platform.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: Zustand
- **Auth**: Supabase Auth
- **Storage**: IndexedDB via Dexie
- **PWA**: next-pwa

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (installed via monorepo)

### Environment Variables

Create a `.env.local` file in the root of this directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

See `.env.example` for the template.

### Development

```bash
# From monorepo root
pnpm --filter web dev

# Or from this directory
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
# From monorepo root
pnpm --filter web build

# Or from this directory
pnpm build
```

### Production

```bash
# After building
pnpm start
```

## Project Structure

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/         # Dashboard page
│   ├── editor/            # Video editor (dynamic route)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (redirects to dashboard)
│   └── globals.css        # Global styles with design tokens
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Supabase client
│   └── db/               # Dexie (IndexedDB) setup
├── stores/               # Zustand state stores
│   ├── auth-store.ts     # Auth state management
│   └── project-store.ts  # Project state management
├── public/               # Static assets
│   └── manifest.json     # PWA manifest
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Design System

The app uses Auteur's design system with:

- **Primary Accent**: Spotify Green (#00E054)
- **Dark Theme**: Multiple shades of dark backgrounds
- **Typography**: Inter font family
- **Spacing**: 8px base unit system

All design tokens are defined in:

- `app/globals.css` (CSS variables)
- `tailwind.config.ts` (Tailwind theme)

See `/docs/design/ui-design-system.md` in the monorepo for the full design specification.

## Monorepo Packages

This app uses shared packages from the monorepo:

- `@auteur/types` - TypeScript type definitions
- `@auteur/api-client` - REST API client
- `@auteur/utils` - Business logic utilities
- `@auteur/auth` - Auth abstractions
- `@auteur/storage` - Storage adapters

## Features

### Current (Infra 0.3)

- ✅ Next.js 16 with App Router
- ✅ TypeScript strict mode
- ✅ Tailwind CSS with design tokens
- ✅ Zustand state management
- ✅ Supabase Auth integration
- ✅ IndexedDB with Dexie
- ✅ PWA support
- ✅ Basic routing structure
- ✅ Placeholder pages (dashboard, auth, editor)

### Upcoming

- Phase 2: Full authentication (Week 6)
- Phase 2: Project management (Week 7)
- Phase 3: Timeline editor (Weeks 8-9)
- Phase 4: Text-based editing (Weeks 12-14)

## Development Notes

### PWA

The PWA is only enabled in production builds. To test PWA features:

```bash
pnpm build
pnpm start
```

### Supabase

Make sure to:

1. Create a Supabase project
2. Add your project URL and anon key to `.env.local`
3. Configure Row Level Security policies (Phase 2)

### TypeScript

The app extends the monorepo's base TypeScript config for consistency. All new code should be strictly typed.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Auteur Roadmap](/docs/requirements/06-development-roadmap.md)
- [Technical Specifications](/docs/requirements/03-technical-specifications.md)

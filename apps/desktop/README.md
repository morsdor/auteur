# Auteur Desktop

Auteur's Electron desktop application built with Vite, React, and TypeScript.

## Features

- ✅ **Electron 32+** - Latest stable release
- ⚛️ **React 19.2.3** - Modern React with hooks
- ⚡ **Vite** - Lightning-fast development and builds
- 🔒 **Secure IPC** - Context isolation with ContextBridge
- 💾 **electron-store** - Encrypted local storage
- 🎨 **@auteur/ui** - Shared UI components with shadcn/ui
- 📦 **Monorepo Integration** - All shared packages integrated

## Architecture

```
apps/desktop/
├── src/
│   ├── main/           # Electron main process (Node.js)
│   │   ├── index.ts    # App lifecycle, window management
│   │   └── ipc.ts      # IPC handlers
│   ├── preload/        # Preload scripts (sandboxed)
│   │   └── index.ts    # ContextBridge API
│   └── renderer/       # React app (browser context)
│       ├── App.tsx     # Main application
│       ├── main.tsx    # React entry point
│       └── styles.css  # Global styles
```

## Security

### Context Isolation ✅

- `nodeIntegration: false`
- `contextIsolation: true`
- `sandbox: true`

### CSP Headers

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
connect-src 'self' https://*.supabase.co wss://*.supabase.co;
```

### IPC Communication

All main process APIs are exposed via ContextBridge:

```typescript
window.electronAPI.storage.get('key');
window.electronAPI.app.getVersion();
window.electronAPI.window.minimize();
```

## Development

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start development mode
cd apps/desktop
pnpm dev

# Type checking
pnpm typecheck

# Lint
pnpm lint
```

## Build

```bash
# Build for current platform
pnpm build

# Build for specific platforms
pnpm build:mac
pnpm build:win
pnpm build:linux
```

## IPC API Reference

### Storage

```typescript
window.electronAPI.storage.get<T>(key: string): Promise<T | undefined>
window.electronAPI.storage.set<T>(key: string, value: T): Promise<boolean>
window.electronAPI.storage.delete(key: string): Promise<boolean>
window.electronAPI.storage.clear(): Promise<boolean>
window.electronAPI.storage.has(key: string): Promise<boolean>
```

### App

```typescript
window.electronAPI.app.getVersion(): Promise<string>
window.electronAPI.app.getPlatform(): Promise<string>
window.electronAPI.app.getName(): Promise<string>
window.electronAPI.app.getPath(name: string): Promise<string | null>
```

### System

```typescript
window.electronAPI.system.getInfo(): Promise<SystemInfo>
```

### Window

```typescript
window.electronAPI.window.minimize(): void
window.electronAPI.window.maximize(): void
window.electronAPI.window.close(): void
```

## Shared Packages Used

- `@auteur/ui` - UI components (Button, Card, Input, etc.)
- `@auteur/types` - TypeScript type definitions
- `@auteur/utils` - Business logic utilities
- `@auteur/api-client` - REST API client (ready for integration)
- `@auteur/auth` - Authentication provider (ready for integration)
- `@auteur/storage` - Storage adapter interface

## Next Steps (INFRA-0.4)

- [ ] Integrate authentication with `@auteur/auth`
- [ ] Add login/register screens
- [ ] Connect to backend API via `@auteur/api-client`
- [ ] Implement project management UI
- [ ] Add video timeline editor

## Tech Stack

- **Electron**: 32.2.10
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Vite**: 6.x
- **Tailwind CSS**: 4.x
- **shadcn/ui**: via @auteur/ui
- **electron-store**: 10.0.0
- **electron-vite**: 2.3.0

## Resources

- [Electron Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)
- [Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- [IPC Communication](https://www.electronjs.org/docs/latest/tutorial/ipc)

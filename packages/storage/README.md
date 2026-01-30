# @auteur/storage

Platform-agnostic storage adapters for Electron and Web.

## Installation

```bash
# In your package.json
{
  "dependencies": {
    "@auteur/storage": "workspace:*"
  }
}
```

## Web Usage (IndexedDB via Dexie)

```typescript
import { WebStorageAdapter } from '@auteur/storage';

const storage = new WebStorageAdapter();

// Set values
await storage.set('user', { id: '123', name: 'John' });
await storage.set('theme', 'dark');

// Get values
const user = await storage.get<User>('user');
const theme = await storage.get<string>('theme');

// Delete
await storage.delete('theme');

// Check existence
const hasUser = await storage.has('user');

// Clear all
await storage.clear();
```

## Electron Usage (electron-store)

```typescript
import { ElectronStorageAdapter } from '@auteur/storage';

const storage = new ElectronStorageAdapter({
  name: 'auteur-config',
  encryptionKey: 'your-encryption-key', // Optional
});

// Same API as Web adapter
await storage.set('session', { token: 'abc123' });
const session = await storage.get('session');
```

## Features

- **Type-safe**: Generic methods with TypeScript support
- **Cross-platform**: Works on Electron and Web with same API
- **Persistent**: Data survives app restarts
- **Encrypted**: Electron adapter supports encryption

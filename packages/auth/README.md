# @auteur/auth

Authentication abstraction layer with Supabase integration.

## Installation

```bash
# In your package.json
{
  "dependencies": {
    "@auteur/auth": "workspace:*",
    "@auteur/storage": "workspace:*"
  }
}
```

## Usage

```typescript
import { SupabaseAuthProvider } from '@auteur/auth';
import { WebStorageAdapter } from '@auteur/storage';

const storage = new WebStorageAdapter();

const auth = new SupabaseAuthProvider({
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
  storage,
});

// Login
const user = await auth.login('user@example.com', 'password');

// Get current user
const currentUser = await auth.getUser();

// Get token
const token = await auth.getToken();

// Subscribe to auth changes
const unsubscribe = auth.onAuthStateChange((user) => {
  if (user) {
    console.log('Logged in:', user.email);
  } else {
    console.log('Logged out');
  }
});

// Logout
await auth.logout();
```

## Platform Support

Works on both Electron and Web by providing appropriate storage adapters from `@auteur/storage`.

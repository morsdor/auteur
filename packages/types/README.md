# @auteur/types

Shared TypeScript type definitions for Auteur AI.

## Installation

This package is internal to the monorepo and automatically linked via pnpm workspaces.

```bash
# In your package.json
{
  "dependencies": {
    "@auteur/types": "workspace:*"
  }
}
```

## Usage

```typescript
import type { User, Project, Job, EDL } from '@auteur/types';

const user: User = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe',
  avatar_url: null,
  created_at: new Date(),
  updated_at: new Date(),
};
```

## Type Categories

### User Types

- `User` - Basic user profile
- `Profile` - Extended profile information
- `AccountSettings` - User preferences

### Project Types

- `Project` - Project metadata
- `MediaFile` - Video/audio/image files
- `VoiceClone` - Cloned voice samples

### Subscription Types

- `Subscription` - User subscription
- `CreditBalance` - Credit balance info
- `CreditTransaction` - Credit transaction history

### EDL Types

- `EDL` - Full Edit Decision List
- `Track` - Timeline track
- `Clip` - Timeline clip
- `Transcript` - Full transcript with segments

### Job Types

- `Job` - AI job metadata
- `JobParams` - Discriminated union of job parameters
- `JobResult` - Discriminated union of job results

### API Types

- `ApiResponse<T>` - Standard API response wrapper
- `ApiError` - Error response
- `PaginatedResponse<T>` - Paginated list response

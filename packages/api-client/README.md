# @auteur/api-client

Type-safe REST API client for Auteur AI Spring Boot backend.

## Installation

```bash
# In your package.json
{
  "dependencies": {
    "@auteur/api-client": "workspace:*"
  }
}
```

## Usage

```typescript
import { AuteurApiClient } from '@auteur/api-client';

const client = new AuteurApiClient({
  baseURL: 'https://api.auteur.ai',
  authToken: 'your-jwt-token',
});

// Set token later
client.setAuthToken('new-jwt-token');

// User endpoints
const user = await client.users.getMe();

// Project endpoints
const projects = await client.projects.list();
const project = await client.projects.create({
  name: 'My Project',
  resolution: '1920x1080',
});

// Job endpoints
const job = await client.jobs.createTranscription({
  project_id: '123',
  media_id: '456',
});

// Poll for status
const status = await client.jobs.get(job.id);
```

## Features

- **Type-safe**: Full TypeScript support with discriminated unions
- **Retry logic**: Automatic retry with exponential backoff (3 retries: 1s, 2s, 4s)
- **Error handling**: Custom error class with status codes
- **Token management**: Easy auth token management

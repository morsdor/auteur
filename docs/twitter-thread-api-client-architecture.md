# Twitter Thread: Building a Type-Safe API Client with React Query

## Tweet 1/10

Building a full-stack video editing SaaS. I often see developers using React Query directly with `fetch()` calls.

This creates tight coupling and makes the codebase harder to maintain as it grows.

Here's our approach: Create a separate API client layer to handle all HTTP communication.

🧵 👇

---

## Tweet 2/10

The architecture has clear layers:

Presentation → React Query (manages data fetching and caching)  
 ↓  
Transport → API Client (handles HTTP requests)  
 ↓  
Protocol → REST/JSON  
 ↓  
Backend → Spring Boot

Each layer has one job. React Query handles caching and state, but doesn't need to know about authentication, retries, or HTTP details.

---

## Tweet 3/10

Our API client wraps the native `fetch` function and adds:

• Automatic retry logic with exponential backoff (tries again after failures)
• Authentication token handling (adds auth tokens automatically)
• TypeScript types for better error handling
• Request cancellation support (stop in-flight requests)
• Interceptors to modify requests/responses (like middleware)

React Query doesn't need to know about any of this.

---

## Tweet 4/10

Type safety using TypeScript generics and discriminated unions:

```typescript
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: { code: string; message: string; };
}

async request<T>(...): Promise<T> {
  // Validates data at runtime + TypeScript checks at compile-time
}
```

You get autocomplete in your IDE and catch errors before runtime.

---

## Tweet 5/10

Why NOT use `fetch` directly in React Query?

1. You'd pass auth tokens everywhere (repetitive and error-prone)
2. Retry logic scattered across components → inconsistent behavior
3. Every query needs its own error handling code (lots of duplication)
4. No standardized request/response format
5. Can't easily add logging or monitoring later
6. Harder to test (need to mock `fetch` in every test file)

This violates the DRY (Don't Repeat Yourself) principle.

---

## Tweet 6/10

Our approach makes dependency injection clean:

```typescript
const QueryClientProvider = ({ client, children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey }) =>
          client.request(queryKey),
      },
    },
  });

  return <ReactQueryProvider value={queryClient}>...
};
```

Easy to swap in a mock client for testing. No extra boilerplate code.

---

## Tweet 7/10

Cross-platform auth token management (Electron + Web):

Tokens are stored using a platform-agnostic adapter:
• Web: IndexedDB (browser database)
• Electron: electron-store (encrypted local storage)

The API client receives storage through dependency injection:

```typescript
new ApiClient({
  storage: platformStorage, // injected based on platform
});
```

---

## Tweet 8/10

Type-safe error handling:

```typescript
class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {}
}

// In your React component
const { error } = useQuery(...);

// TypeScript knows the error type
if (error instanceof ApiClientError) {
  switch(error.code) {
    case 'INSUFFICIENT_CREDITS': ...
  }
}
```

---

## Tweet 9/10

Testing strategy:

Unit tests: Mock API client methods  
Integration tests: Mock fetch at the boundary  
E2E tests: Real API calls

vs. using MSW (Mock Service Worker) everywhere:
• MSW adds delay in development
• Service worker debugging is complex
• Mocking at the network level can miss bugs in client logic

We test our abstraction layer, not the low-level transport.

---

## Tweet 10/10

Trade-offs we evaluated:

Alternatives considered:
• tRPC: Our backend is Java Spring Boot (not Node/TypeScript)
• GraphQL: Too complex for our REST API, steep learning curve
• Direct fetch calls: Gets messy at scale
• openapi-generator: Generated types are often poor quality, configuration is complex

A custom client gives us the most control + best developer experience.

Lessons learned building @AuteurAI 🎬

---

## BONUS TWEET (Thread Reply)

For those asking about implementation details:

Monorepo structure:

```
packages/
  api-client/       # HTTP transport layer
    endpoints/      # Organized by feature domain
      auth.ts
      projects.ts
      jobs.ts
  types/           # Shared TypeScript types
```

Published as `@auteur/api-client` workspace package.  
No external dependencies except types.  
~2KB when gzipped.

Full type inference from backend → frontend (will share our code generation approach in a future post).

---

## KEY ARCHITECTURAL DECISIONS SUMMARY

### 1. Separation of Concerns

- Transport layer (API client) is separate from data orchestration (React Query)
- Each layer handles its own responsibilities

### 2. Type Safety

- Discriminated unions for different error states
- Generic types for flexible request/response handling
- Full IDE autocomplete and type checking

### 3. Cross-Platform Support

- Platform-agnostic storage adapter pattern
- Dynamic imports for Electron-specific dependencies
- Dependency injection makes testing easier

### 4. Maintainability

- Single place for authentication logic
- Centralized retry and error handling
- Easy to add new features (logging, tracing, metrics)

### 5. Developer Experience

- Clean, intuitive API
- Composable endpoint methods
- Easy to mock for testing

This architecture scales to handle 100+ API endpoints across multiple platforms (Web, Electron, and future mobile apps).

Built for production applications, not just demos.

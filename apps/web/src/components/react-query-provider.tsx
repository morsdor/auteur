'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  // We use useState to lazily initialize the QueryClient.
  // This ensures that true data isolation exists between users in SSR (Server-Side Rendering).
  //
  // If we created this outside the component (globally), all users on the server would
  // share the same Cache, leading to data leaks (User A seeing User B's data).
  //
  // By using useState:
  // 1. A unique client is created per request (on Server).
  // 2. The client is stable across re-renders (on Client).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

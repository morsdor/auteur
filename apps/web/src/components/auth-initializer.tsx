'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../stores/auth-store';

/**
 * AuthInitializer Component
 *
 * This component is critical for initializing the authentication state when the app starts.
 * It is extracted into a separate component for two main reasons:
 *
 * 1. strict mode Compliance: In development, React Strict Mode renders components twice.
 *    Using a `useRef` guard ensures `initialize()` is called exactly once, preventing
 *    race conditions or double-initialization of the Supabase client.
 *
 * 2. Separation of Concerns: It decouples the *initialization* logic (loading from storage)
 *    from the *protection* logic (redirecting in AuthGuard), keeping the root layout clean.
 */
export function AuthInitializer() {
  const initialized = useRef(false);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (!initialized.current) {
      console.log('[AuthInitializer] Initializing auth store...');
      initialized.current = true;
      initialize()
        .then(() => {
          console.log('[AuthInitializer] Initialization complete');
        })
        .catch((error) => {
          console.error('[AuthInitializer] Initialization failed:', error);
          // Optional: You could set an error state here or reset initialized.current
          // to allow retries, but for now just logging ensures we see the error.
        });
    }
  }, [initialize]);

  return null;
}

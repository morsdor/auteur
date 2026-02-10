'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../stores/auth-store';
import { useQueryClient } from '@tanstack/react-query';

/**
 * AuthEffects Component
 *
 * Handles side effects related to authentication state changes that require
 * access to React Context (like QueryClient).
 *
 * This bridge is necessary because useAuthStore is a vanilla Zustand store
 * and cannot directly access the QueryClient context.
 */
export function AuthEffects() {
  const { isAuthenticated, user } = useAuthStore();
  const queryClient = useQueryClient();
  const wasAuthenticated = useRef(isAuthenticated);
  const lastUserId = useRef(user?.id);

  useEffect(() => {
    // If user was authenticated and now is not (logout)
    if (wasAuthenticated.current && !isAuthenticated) {
      console.log('[AuthEffects] User logged out, clearing cache...');

      const userId = lastUserId.current;

      // Remove specific user profile query
      if (userId) {
        queryClient.removeQueries({ queryKey: ['user', 'profile', userId] });
      } else {
        // Fallback to general user clear if no ID tracked
        queryClient.removeQueries({ queryKey: ['user'] });
      }
    }

    // Update refs for next render
    wasAuthenticated.current = isAuthenticated;
    if (user?.id) {
      lastUserId.current = user.id;
    }
  }, [isAuthenticated, user, queryClient]);

  return null;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/auth-store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Debug logs
    console.log('[AuthGuard] State:', { isLoading, isAuthenticated, hasUser: !!user });

    if (!isLoading && !isAuthenticated) {
      console.log('[AuthGuard] Redirecting to login');
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent-primary border-t-transparent mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}

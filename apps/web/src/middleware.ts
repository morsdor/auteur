import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for middleware
// Note: Middleware runs on Edge Runtime, so we need to be careful with dependencies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  // Check for session in cookies (Supabase auth helper would be better here but we're manual)
  // Since we are using client-side auth mainly, middleware protection is a bit tricky without
  // cookie syncing. For now, let's rely on client-side redirect for full security
  // and use this middleware for basic optimized routing.

  // Actually, without cookie syncing, server-side middleware can't see the session easily
  // unless we implement the cookie logic.
  // Given we are using a custom store with localStorage/IndexedDB, the server DOES NOT
  // have access to the auth state in cookie by default.

  // STRATEGY CHANGE:
  // Since we use client-side storage (IndexedDB/LocalStorage) for the Auth Store,
  // we cannot effectively use Server-Side Middleware for auth protection without
  // implementing a cookie-syncing mechanism.
  //
  // For this phase, it is safer and simpler to implement CLIENT-SIDE protection (HOC/Layout)
  // consistent with the Desktop App.

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};

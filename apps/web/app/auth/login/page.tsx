'use client';

import { LoginForm } from '@auteur/ui';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/auth-store';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithOAuth, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log(`Login with ${provider}`);
    if (provider !== 'google' && provider !== 'github') return;

    try {
      await signInWithOAuth(provider);
    } catch (err: any) {
      console.error('Social login error:', err);
      setError(err.message || 'Social login failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            <span className="text-accent-primary">Auteur</span> AI
          </h1>
          <p className="text-text-secondary">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <LoginForm
          onSubmit={handleLogin}
          onGoogleClick={() => handleSocialLogin('google')}
          onGithubClick={() => handleSocialLogin('github')}
          onRegisterClick={() => router.push('/auth/register')}
        />

        <p className="text-center text-xs text-text-muted mt-8">&copy; 2026 Auteur AI</p>
      </div>
    </div>
  );
}

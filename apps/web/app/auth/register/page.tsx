'use client';

import { RegisterForm } from '@auteur/ui';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/auth-store';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: any) => {
    setError(null);
    try {
      const user = await signUp(data.email, data.password);

      // After successful signup, redirect based on user presence
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login?registered=true');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login via AuthProvider
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            <span className="text-accent-primary">Auteur</span> AI
          </h1>
          <p className="text-text-secondary">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <RegisterForm
          onSubmit={handleRegister}
          onGoogleClick={() => handleSocialLogin('google')}
          onGithubClick={() => handleSocialLogin('github')}
          onLoginClick={() => router.push('/auth/login')}
        />

        <p className="text-center text-xs text-text-muted mt-8">&copy; 2026 Auteur AI</p>
      </div>
    </div>
  );
}

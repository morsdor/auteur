/**
 * Login Page Component
 * Handles user authentication (login and signup)
 */
import { useState } from 'react';
import { LoginForm, RegisterForm } from '@auteur/ui';
import { useAuthStore } from '../stores/auth-store';

export function LoginPage() {
  const { signIn, signUp, isLoading, user } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    setLocalError(null);
    try {
      await signIn(data.email, data.password);
    } catch (err: any) {
      console.error('Login error:', err);
      setLocalError(err.message || 'Login failed');
    }
  };

  const handleSignup = async (data: any) => {
    setLocalError(null);
    try {
      await signUp(data.email, data.password);
    } catch (err: any) {
      console.error('Signup error:', err);
      setLocalError(err.message || 'Signup failed');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login via Electron (needs custom flow or Supabase helper)
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Auteur <span className="text-[#00E054]">Desktop</span>
          </h1>
          <p className="text-gray-400">AI-Powered Video Editing Platform</p>
        </div>

        {/* Error Message */}
        {localError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{localError}</p>
          </div>
        )}

        {/* Auth Forms */}
        {isSignup ? (
          <RegisterForm
            onSubmit={handleSignup}
            onGoogleClick={() => handleSocialLogin('google')}
            onGithubClick={() => handleSocialLogin('github')}
            onLoginClick={() => {
              setIsSignup(false);
              setLocalError(null);
            }}
          />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            onGoogleClick={() => handleSocialLogin('google')}
            onGithubClick={() => handleSocialLogin('github')}
            onRegisterClick={() => {
              setIsSignup(true);
              setLocalError(null);
            }}
          />
        )}

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Using Shared @auteur/auth Store</p>
        </div>
      </div>
    </div>
  );
}

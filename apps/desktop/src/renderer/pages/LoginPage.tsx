/**
 * Login Page Component
 * Handles user authentication (login and signup)
 */
import React from 'react';
import { useState } from 'react';
import { Button } from '@auteur/ui/components/button';
import { Input } from '@auteur/ui/components/input';
import { Label } from '@auteur/ui/components/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@auteur/ui/components/card';
import { useAuth } from '../contexts/auth';

export function LoginPage() {
  const { login, signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      // Error is already set in context
      console.error('Auth error:', err);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setLocalError(null);
  };

  const displayError = localError || error;

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

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle>{isSignup ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>
              {isSignup
                ? 'Sign up to start creating amazing videos'
                : 'Sign in to continue to your projects'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {displayError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{displayError}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}
              </Button>

              {/* Toggle Mode */}
              <div className="text-center text-sm text-gray-400">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-[#00E054] hover:underline"
                  disabled={loading}
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Using @auteur/auth with Supabase authentication</p>
        </div>
      </div>
    </div>
  );
}

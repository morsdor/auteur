'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic will be implemented in Phase 2
    // TODO: Implement authentication
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

        <div className="bg-bg-component border border-border-default rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-primary border border-border-default rounded-md px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary border border-border-default rounded-md px-4 py-2 text-text-primary focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold py-3 rounded-md shadow-glow-green hover:shadow-glow-green-strong transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-tertiary">
              Don&apos;t have an account?{' '}
              <a
                href="/auth/register"
                className="text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted mt-8">
          Placeholder login page - Auth will be implemented in Phase 2
        </p>
      </div>
    </div>
  );
}

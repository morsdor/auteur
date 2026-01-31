'use client';

import { useState } from 'react';
import { Button } from '@auteur/ui';
import { Input } from '@auteur/ui';
import { Label } from '@auteur/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auteur/ui';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // TODO: Show error to user (e.g., via state or toast)
      return;
    }
    // Auth logic will be implemented in Phase 2
    // TODO: Implement registration
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

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Create an account to start editing videos with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <div className="text-center text-sm text-text-tertiary">
                Already have an account?{' '}
                <a
                  href="/auth/login"
                  className="text-accent-primary hover:text-accent-primary-hover font-medium transition-colors"
                >
                  Sign in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-text-muted mt-8">
          Placeholder registration page - Auth will be implemented in Phase 2
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { Loader2 } from 'lucide-react';
import { SocialAuthButtons } from './social-auth-buttons';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginSchema = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => Promise<void>;
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
  onRegisterClick?: () => void;
}

export function LoginForm({
  onSubmit,
  onGoogleClick,
  onGithubClick,
  onRegisterClick,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <SocialAuthButtons
          onGoogleClick={onGoogleClick}
          onGithubClick={onGithubClick}
          isLoading={isLoading}
        />
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={onRegisterClick}
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}

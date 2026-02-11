/**
 * @auteur/ui
 * Shared UI components using shadcn/ui with Auteur design tokens
 */

export { Button, buttonVariants, type ButtonProps } from './components/button';
export { Input, type InputProps } from './components/input';
export { Label } from './components/label';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/card';
// Auth components
export * from './components/auth/login-form';
export * from './components/auth/register-form';
export * from './components/auth/social-auth-buttons';
export * from './components/auth/auth-layout';

export { cn } from './lib/utils';

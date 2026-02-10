import { AuthGuard } from '../../src/components/auth-guard';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#00E054',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

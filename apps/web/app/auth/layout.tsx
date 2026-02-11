import { GuestGuard } from '../../src/components/guest-guard';
import { AuthLayout as SharedAuthLayout } from '@auteur/ui';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <SharedAuthLayout>{children}</SharedAuthLayout>
    </GuestGuard>
  );
}

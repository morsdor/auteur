import { GuestGuard } from '../../src/components/guest-guard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}

import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to dashboard for now
  // In the future, this could be a marketing landing page
  redirect('/dashboard');
}

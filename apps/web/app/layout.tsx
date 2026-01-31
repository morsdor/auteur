import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Auteur AI - AI-Powered Video Editing',
  description:
    'Professional AI-powered video editing platform with text-based editing, voice cloning, lip sync, and more.',
  keywords: ['video editing', 'AI video editor', 'text-based editing', 'voice cloning', 'lip sync'],
  authors: [{ name: 'Auteur AI' }],
  themeColor: '#00E054',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

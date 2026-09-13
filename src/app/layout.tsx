import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'MY Balance — Protect your energy, beat burnout',
  description:
    'Know your load. Protect your energy. University student stress and multi-dimensional workload manager.',
  keywords: [
    'student wellbeing',
    'workload manager',
    'stress check-in',
    'burnout prevention',
    'productivity app',
  ],
  authors: [{ name: 'Alex - MY Balance Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}

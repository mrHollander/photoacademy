import type { Metadata } from 'next';
import './globals.css';
import Analytics from '@/components/layout/Analytics';

export const metadata: Metadata = {
  title: {
    default: 'Etili Hollander — Boutique Photography | Turn Everyday Moments Into Professional Photos',
    template: '%s | Etili Hollander — Boutique Photography',
  },
  description: 'Learn how to photograph your children, family, travels and everyday life beautifully — using only your smartphone.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://photocraft.com',
    siteName: 'Etili Hollander — Boutique Photography',
    title: 'Etili Hollander — Boutique Photography | Turn Everyday Moments Into Professional Photos',
    description: 'Learn how to photograph your children, family, travels and everyday life beautifully — using only your smartphone.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Analytics from '@/components/layout/Analytics';

export const metadata: Metadata = {
  title: {
    default: 'PhotoCraft — Take Beautiful Photos With Your Phone',
    template: '%s | PhotoCraft',
  },
  description: 'Learn simple professional photography techniques that immediately improve your everyday smartphone photos. No expensive camera or technical knowledge required.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://photocraft.com',
    siteName: 'PhotoCraft',
    title: 'PhotoCraft — Take Beautiful Photos With Your Phone',
    description: 'Learn simple professional photography techniques that immediately improve your everyday smartphone photos.',
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

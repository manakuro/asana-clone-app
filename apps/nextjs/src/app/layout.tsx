import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { LayoutDefault } from '@/components/ui/layout';
import { AppContext } from '@/contexts/app-context';
import { AuthContext } from '@/contexts/auth-context';
import { description } from '@/lib/metatag/description';
import { title } from '@/lib/metatag/title';
import { roboto } from '@/styles/fonts';

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/icon/icon-192x192.png',
    apple: '/icon/apple-touch-icon-180x180.png',
  },
  robots: {
    index: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/icon/icon-192x192.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/icon/android-chrome-128x128.png"
        />
        <link rel="manifest" href="/icon/manifest.json" />
      </head>
      <body>
        <AuthContext>
          <AppContext>
            <LayoutDefault>{children}</LayoutDefault>
          </AppContext>
        </AuthContext>
      </body>
    </html>
  );
}

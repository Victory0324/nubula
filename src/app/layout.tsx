import 'server-only';
import './globals.css';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { SSRProvider } from '@/app/providers/SSR';
import { SFXProvider } from '@/app/providers/sfx';
import { AnalyticsProvider } from './providers/analytics';
import Toasts from './shared/Toasts';
import { SettingsProvider } from './providers/settings';
import { SessionProvider } from './(unauthenticated)/provider/session';
import { UserProvider } from './providers/User';
import { WalletProvider } from './providers/Wallet';
import { RouterProvider } from './providers/router';
import { CMSProvider } from './providers/cms';
import { MenuProvider } from './providers/menu';
import ModalProvider from './providers/modal';

import getCmsContent from '@/utils/cms/getCmsContent';

import MaintenanceProvider from './providers/maintenance';

export const metadata: Metadata = {
  title: 'KORUS',
  description: 'By Pixelynx',
  openGraph: {
    title: 'Korus',
    description:
      'Korus — AI-powered music companions that give you the power to play, create and remix music from iconic labels and more in a fun, first-of-its-kind interactive format.',
    type: 'website',
  },
  twitter: {
    title: 'Korus',
    card: 'summary',
  },
};

function getClientIP() {
  // https://vercel.com/docs/edge-network/headers#x-forwarded-for
  const forwardedFor = headers().get('x-forwarded-for');
  return forwardedFor?.split(',').at(0);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cmsContent = await getCmsContent();

  return (
    <html lang='en'>
      <body>
        <CMSProvider {...cmsContent}>
          <RouterProvider>
            <SettingsProvider>
              <SFXProvider>
                <SSRProvider>
                  <SessionProvider>
                    <AnalyticsProvider clientIPAddress={getClientIP()}>
                      <UserProvider>
                        <ModalProvider>
                          <MaintenanceProvider>
                            <MenuProvider>
                              <WalletProvider>{children}</WalletProvider>
                            </MenuProvider>
                          </MaintenanceProvider>
                        </ModalProvider>
                        <Toasts />
                      </UserProvider>
                    </AnalyticsProvider>
                  </SessionProvider>
                </SSRProvider>
              </SFXProvider>
            </SettingsProvider>
          </RouterProvider>
        </CMSProvider>
      </body>
    </html>
  );
}

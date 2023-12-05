import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'INVENTORY',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

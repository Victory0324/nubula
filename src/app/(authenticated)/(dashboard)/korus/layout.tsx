import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KORUS',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

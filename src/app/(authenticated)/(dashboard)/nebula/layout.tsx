import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEBULA',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

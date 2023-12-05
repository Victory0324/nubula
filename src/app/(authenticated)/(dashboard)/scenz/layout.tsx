import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SCENZ',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

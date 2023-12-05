import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OUTPUT',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

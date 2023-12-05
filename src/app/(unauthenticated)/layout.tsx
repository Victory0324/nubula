import type { Metadata } from 'next';
import { SignupProvider } from './provider/signup';
import GTag from './GTag';

export const metadata: Metadata = {
  title: 'KORUS',
  description: 'By Pixelynx',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GTag />
      <SignupProvider>{children}</SignupProvider>
    </>
  );
}

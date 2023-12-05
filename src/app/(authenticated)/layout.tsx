import AuthenticatedProviders from './providers';

export default function AuthenticatedLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <AuthenticatedProviders>
      <>{children}</>
    </AuthenticatedProviders>
  );
}

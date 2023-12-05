import Dashboard from '@/app/shared/layout/Dashboard';

export default function AuthenticatedLayout({
  children,
  sidebar,
  footer,
}: React.PropsWithChildren<{
  sidebar: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <Dashboard
      sideBarContent={
        <div className='w-full h-full flex flex-col justify-between'>
          {sidebar}
          {footer}
        </div>
      }
    >
      {children}
    </Dashboard>
  );
}

'use client';
import ContentWrapper from './ContentWrapper';
import { useMemo } from 'react';
import { useOutputTrack } from '../../../providers/outputTrack';
import { MobileTrayProvider } from '../../../providers/mobileTray';

interface DashboardProps {
  sideBarContent: JSX.Element;
}

export const SidebarContainer = ({ children }: React.PropsWithChildren) => {
  const { creating } = useOutputTrack();

  const loadingStateCss = useMemo(() => {
    return creating ? 'opacity-30 pointer-events-none' : '';
  }, [creating]);

  return (
    <div className='flex-auto lg:w-4/12 '>
      <div
        className={`
          bg-gray-13
          flex flex-col
          w-full
          lg:h-screen
          lg:pt-5
          transition-opacity
          ${loadingStateCss}
        `}
      >
        {children}
      </div>
    </div>
  );
};

const Dashboard = ({
  children,
  sideBarContent,
}: React.PropsWithChildren<DashboardProps>) => {
  return (
    <MobileTrayProvider>
      <div className='flex flex-col lg:flex-row min-h-screen'>
        <div
          className='
            bg-gray-10
            sticky
            top-0
            z-10
            lg:contents'
        >
          <ContentWrapper>{children}</ContentWrapper>
        </div>

        <SidebarContainer>{sideBarContent}</SidebarContainer>
      </div>
    </MobileTrayProvider>
  );
};

export default Dashboard;

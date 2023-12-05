'use client';

import { useEffect, useState } from 'react';
import Lynx from '../../../Lynx';
import DesktopMenu from './DesktopMenu';

import MobileHeader from '../MobileHeader';
import MobileTray from './MobileTray';
import { useMobileTray } from '../../../../providers/mobileTray';
import Universe from '@/app/shared/Universe';
import DesktopMenuBar from './DesktopMenuBar';
import { useMenu } from '@/app/providers/menu';
import CoinAnimation from './CoinAnimation';

const ContentWrapper = ({ children }: React.PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { isUniverseOpen } = useMenu();
  const { content, isTrayOpen } = useMobileTray();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MobileHeader />
      <DesktopMenuBar />
      <CoinAnimation />

      <div
        className={`
          lg:flex
          transition-[height]

          duration-200
          ${isScrolled ? 'h-[212px]' : 'h-[412px]'}

          lg:h-auto
          lg:w-8/12

          mb-5 lg:mb-0`}
      >
        <DesktopMenu />
        <div
          className={` border-purple-9a lg:border flex flex-col fixed right-0 h-full w-full lg:w-[calc(100%-72px)] transition-opacity duration-500 lg:pb-0 ${
            isUniverseOpen ? 'opacity-100 z-10' : 'opacity-0 invisible'
          } overflow-hidden bg-gray-10`}
        >
          <Universe />
        </div>
        <MobileTray isTrayOpen={isTrayOpen}>{content}</MobileTray>

        <div
          className='
            lg:flex
            relative
            flex-col grow
            w-full h-full
            justify-between
          '
        >
          <Lynx />
          <div className='h-full overflow-hidden'>{children}</div>
        </div>
      </div>
      <div
        className='lg:hidden flex align-center justify-center pb-1'
        onClick={() => {
          setIsScrolled(!isScrolled);
        }}
      >
        <svg
          width='52'
          height='5'
          viewBox='0 0 52 5'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            width='52'
            height='5'
            rx='2.5'
            fill='currentcolor'
            fillOpacity='0.75'
          />
        </svg>
      </div>
    </>
  );
};

export default ContentWrapper;

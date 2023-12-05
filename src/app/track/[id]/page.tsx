'use client';

import KorusLogo from '@/app/shared/layout/Dashboard/ContentWrapper/assets/KorusLogo';
import Track from './Track';
import { useEffect } from 'react';
import { useAnalytics } from '@/app/providers/analytics';
import { AudioXYEffectsProvider } from '@/app/providers/audioXYEffects';

const TrackPage = ({ params }: { params: { id: string } }) => {
  const { track } = useAnalytics();

  useEffect(() => {
    track({ category: 'share', action: 'visit', name: params.id });
  }, [track, params.id]);

  return (
    <AudioXYEffectsProvider>
      <div className='min-h-screen p-4 flex flex-col bg-black'>
        <div
          className='
            flex-1
            flex
            relative
            flex-col 
            justify-between
            rounded-2xl
            lg:rounded-tl-none
            border-t
            border-b border-l border-r
            border-solid border-gray-999
            the-corner--desktop-logo
          '
        >
          <div
            className='
            hidden
            lg:block
            lg:absolute

            p-5

            bg-black
            border-solid
            border-b
            border-r
            border-gray-999

            rounded-2xl
            rounded-tr-none
            rounded-bl-none
            logo-border-left
            logo-border-top
            z-10'
          >
            <KorusLogo />
          </div>
          <Track id={params.id} />
        </div>
      </div>
    </AudioXYEffectsProvider>
  );
};

export default TrackPage;

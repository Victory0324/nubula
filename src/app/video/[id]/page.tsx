'use client';

import Video from './Video';
import { useEffect } from 'react';
import { useAnalytics } from '@/app/providers/analytics';
import Callout from '@/app/shared/Callout';
import Image from 'next/image';
import nightSky from '../../shared/Universe/night-sky.png';

const TrackPage = ({ params }: { params: { id: string } }) => {
  const { track } = useAnalytics();

  useEffect(() => {
    track({ category: 'share', action: 'visit', name: params.id });
  }, [track, params.id]);

  return (
    <>
      <Image src={nightSky} alt='night sky background' fill={true} />
      <div className='min-h-screen flex flex-col bg-black z-10 relative'>
        <Callout itemType='video' />
        <Video id={params.id} />
      </div>
    </>
  );
};

export default TrackPage;

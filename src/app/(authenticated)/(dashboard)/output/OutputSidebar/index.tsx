'use client';

import Image from 'next/image';

import { useStems } from '../../nebula/providers/stems';
import { useOutputTrack } from '@/app/providers/outputTrack';
import CoverArt from '../../nebula/assets/CoverArt';
import { useMemo, useState } from 'react';
import InfoIcon from './InfoIcon';
import InfoModal from './InfoModal';
import Chords from '@/app/shared/assets/Chords';
import Bass from '@/app/shared/assets/Bass';
import Drums from '@/app/shared/assets/Drums';
import Melody from '@/app/shared/assets/Melody';
import TrackFeed from '@/app/shared/assets/TrackFeed';

interface StemWrapperProps {
  stem: OutputTrackStem;
}

const StemIcon = ({ stem }: StemWrapperProps) => {
  switch (stem.category) {
    case 'chords':
      return <Chords />;
    case 'bass':
      return <Bass />;
    case 'drums':
      return <Drums />;
    case 'melody':
      return <Melody />;
    default:
      return <Chords />;
  }
};

const StemWrapper = ({ stem }: StemWrapperProps) => {
  const { setSelectedOutputStem, selectedOutputStem } = useStems();
  return (
    <div
      className={`
        border-t border-gray-42
        md:py-2 
        font-bold flex
        items-center
        capitalize
        hover:cursor-pointer

        ${selectedOutputStem === stem ? 'opacity-100' : 'opacity-80'}
        hover:opacity-100
      `}
      onClick={() => {
        setSelectedOutputStem(stem);
      }}
    >
      <div className='flex items-center justify-center w-[63px] h-[63px] mx-4'>
        <StemIcon stem={stem} />
      </div>

      <span>{stem.category}</span>
    </div>
  );
};

const OutputSidebar = () => {
  const { outputTrack } = useOutputTrack();
  const { selectedOutputStem, setSelectedOutputStem } = useStems();

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const stemCount = useMemo(() => {
    return outputTrack && outputTrack.stems
      ? outputTrack.stems.length + 1
      : '-';
  }, [outputTrack]);

  const art = useMemo(() => {
    if (!outputTrack) {
      return <CoverArt />;
    }

    let track = outputTrack as OutputTrack;

    if (track.artworkImageUrl) {
      return (
        <Image
          src={track.artworkImageUrl}
          width={63}
          height={63}
          className='bg-gray-13'
          alt={`Album artwork for ${
            outputTrack.name || outputTrack.generatedTrackName
          }`}
        />
      );
    }
  }, [outputTrack]);

  return (
    <>
      <div className='px-5 py-5'>
        <div
          className='
          justify-between
          flex
          pb-3
          text-xl
          items-center
        '
        >
          <div className='flex items-center'>
            OUTPUT{' '}
            <button
              onClick={() => {
                setInfoModalOpen(true);
              }}
            >
              <InfoIcon className='ms-2' />
            </button>
          </div>
          <div className='border-gray-999 border rounded-xl flex px-3 py-2 items-center'>
            <TrackFeed />
            <span className='text-xs ps-2'>{stemCount}</span>
          </div>
        </div>
      </div>
      <div className='px-5 overflow-y-scroll no-scrollbar flex-grow h-full'>
        <div className='max-sm:mb-[225px]'>
          {outputTrack && (
            <div
              className={`
            border-t border-gray-42
            md:py-2 
            font-bold flex capitalize
            hover:cursor-pointer
            items-center
            ${!selectedOutputStem ? 'opacity-100' : 'opacity-80'}

            hover:opacity-100`}
              onClick={() => {
                setSelectedOutputStem(undefined);
              }}
            >
              <span className='mx-4'>{art}</span>

              <span>
                {outputTrack?.name || outputTrack?.generatedTrackName}
              </span>
            </div>
          )}
          {outputTrack?.stems?.map((stem) => (
            <StemWrapper key={stem.itemId} stem={stem} />
          ))}
        </div>
        <InfoModal
          shown={infoModalOpen}
          close={() => {
            setInfoModalOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default OutputSidebar;

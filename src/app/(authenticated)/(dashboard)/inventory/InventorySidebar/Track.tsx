import { useCallback, useMemo, useState } from 'react';
import HeartOutline from '../assets/HeartOutline';
import Heart from '@/app/shared/assets/Heart';
import Link from '@/app/(authenticated)/(dashboard)/inventory/assets/Link';
import usePatchTrack from '@/utils/hooks/tracks/usePatchTrack';
import TrackActions from './TrackActions';
import TrackInfo from './TrackInfo';
import { useOutputTrack } from '@/app/providers/outputTrack';
import Image from 'next/image';
import WaveForm from '../assets/WaveForm';
import { useAudioPlayer } from '../../nebula/providers/audioPlayer';

type Props = TrackInstance & { index: number };

export default function Track(track: Props) {
  const { setOutputTrack } = useOutputTrack();
  const { currentTrack, playing, setPlaying } = useAudioPlayer();
  const patchTrack = usePatchTrack();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = useMemo(() => {
    return (currentTrack as OutputTrack)?.instanceId == track.instanceId;
  }, [currentTrack, track.instanceId]);

  const isPlaying = useMemo(() => {
    return isSelected && playing;
  }, [isSelected, playing]);

  const handleClick = useCallback(() => {
    isPlaying
      ? setPlaying(false)
      : isSelected
      ? setPlaying(true)
      : setOutputTrack({
          ...track.body,
          isFavourite: track.isFavourite,
          instanceId: track.instanceId,
        });
  }, [
    isPlaying,
    isSelected,
    setOutputTrack,
    setPlaying,
    track.isFavourite,
    track.instanceId,
    track.body,
  ]);

  const handleFavorite = useCallback(async () => {
    await patchTrack({
      trackId: track.instanceId,
      title: track.name,
      isFavourite: !track.isFavourite,
    });
  }, [track, patchTrack]);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='border border-t-0 border-r-0 border-l-0 border-gray-42 cursor-pointer hover:bg-gray-3c transition-colors'
    >
      <div className='flex'>
        <div
          onClick={handleClick}
          className='flex w-3/5 overflow-x-hidden items-center gap-2'
        >
          <div className='relative overflow-hidden w-24 shrink-0'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-center w-10'>
                {isPlaying ? (
                  <WaveForm className='text-purple-9a' />
                ) : (
                  <div className='text-xs text-gray-400'>{track.index}</div>
                )}
              </div>
              {track.body.artworkImageUrl && (
                <div className='w-[56px] h-[56px] relative bg-transparent'>
                  <Image
                    src={track.body.artworkImageUrl}
                    fill
                    alt={`Album artwork for ${track.name}`}
                  />
                </div>
              )}
            </div>
          </div>
          <div className='overflow-x-hidden py-2 grow'>
            <p
              className={`text-base font-bold truncate  ${
                isSelected ? 'text-purple-9a' : 'text-white'
              }  `}
            >
              {track.name}
            </p>
            <p className='text-xs truncate text-gray-400'>
              {track.body.artists?.join(', ')}
            </p>
          </div>
        </div>

        <div className='w-1/5 flex items-center justify-start'>
          {track.tokenId && <Link />}
        </div>

        <div className='w-1/5 flex items-center cursor-pointer'>
          <div className='w-1/3'>
            {track.isFavourite && (
              <Heart
                width='20'
                height='20'
                onClick={handleFavorite}
                className='text-purple-9a'
              />
            )}
            {isHovered && !track.isFavourite && (
              <HeartOutline
                width='20'
                height='20'
                onClick={handleFavorite}
                className={`hover:text-purple-9a transition-colors ${
                  track.isFavourite ? 'text-purple-9a' : ''
                }`}
              />
            )}
          </div>
          <div className='w-1/3'>
            <TrackInfo inputStemId={track.body.inputStemId} />
          </div>
          <div className='w-1/3 relative'>
            <TrackActions {...track} />
          </div>
        </div>
      </div>
    </li>
  );
}

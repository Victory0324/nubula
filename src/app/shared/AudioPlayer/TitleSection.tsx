import { useCallback, useMemo, useState } from 'react';

import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';

import Check from '@/app/(authenticated)/(dashboard)/nebula/assets/Check';
import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';
import CoverArt from '@/app/(authenticated)/(dashboard)/nebula/assets/CoverArt';
import Pencil from '../assets/Pencil';

import Image from 'next/image';
import FavoriteButton from './FavoriteButton';
import useSaveInstance from '@/utils/hooks/instances/useSave';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useValidateSpecialCharacters } from '@/utils/hooks/forms/useValidate';

interface TitleSectionProps {
  newTrackName: string;
  setNewTrackName: React.Dispatch<React.SetStateAction<string>>;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  newTrackName,
  setNewTrackName,
}) => {
  const { setOutputTrack } = useOutputTrack();
  const { allowSave, handleSave } = useSaveInstance();
  const { currentTrack, trackType, trackName } = useAudioPlayer();
  const [isRenaming, setIsRenaming] = useState(false);
  const { validationError, validate } = useValidateSpecialCharacters();

  const onRename = useCallback(async () => {
    setIsRenaming(false);
    if (trackType === 'empty' || newTrackName === trackName) return;

    if (!newTrackName?.length) {
      setNewTrackName(trackName);
      return;
    }

    const track = currentTrack as OutputTrack;

    if (track.instanceId || trackType === 'input') {
      handleSave(newTrackName);
    } else {
      setOutputTrack({ ...track, name: newTrackName });
    }
  }, [
    trackType,
    newTrackName,
    trackName,
    currentTrack,
    setNewTrackName,
    handleSave,
    setOutputTrack,
  ]);

  const art = useMemo(() => {
    if (!currentTrack || trackType !== 'output') {
      return <CoverArt />;
    }

    let track = currentTrack as OutputTrack;
    if (track.artworkImageUrl) {
      return (
        <Image
          src={track.artworkImageUrl}
          width={63}
          height={63}
          alt={`Album artwork for ${trackName}`}
        />
      );
    }
  }, [currentTrack, trackName, trackType]);

  return (
    <div className='flex flex-row justify-between m-5 z-0'>
      <div className='flex flex-row items-center gap-2 grow h-[42px] lg:h-[55px]'>
        <div className={`relative hidden lg:block h-auto`}>{art}</div>
        {isRenaming ? (
          <>
            <input
              className={`transition-colors bg-transparent border rounded-xl py-2 pl-4 grow w-full pr-[50px] ${
                validationError
                  ? 'border-red-warning focus-visible:outline-none'
                  : 'focus:outline-none focus:border-white hover:border-white border-gray-999'
              }`}
              value={newTrackName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  !validationError && onRename();
                }
              }}
              onChange={(e) => {
                validate(e.target.value);
                setNewTrackName(e.target.value);
              }}
              maxLength={24}
            />
            <div
              className='absolute right-[95px] hover:cursor-pointer'
              onClick={() => {
                !validationError && onRename();
              }}
            >
              <Check />
            </div>
            <div
              className='hover:cursor-pointer'
              onClick={() => {
                setIsRenaming(false);
                setNewTrackName(trackName);
              }}
            >
              <X />
            </div>
          </>
        ) : currentTrack ? (
          <>
            {trackName}
            {allowSave ? (
              <div onClick={() => setIsRenaming((p) => !p)}>
                <Pencil className='text-gray-999 hover:text-white transition-colors hover:cursor-pointer' />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <span className='text-gray-999 ml-4'>–</span>
        )}
      </div>
      <div className='lg:hidden'>
        {!isRenaming && <FavoriteButton newTrackName={newTrackName} />}
      </div>
    </div>
  );
};

export default TitleSection;

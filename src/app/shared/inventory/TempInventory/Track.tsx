import { MutableRefObject, useRef } from 'react';

import { Howl } from 'howler';
import Trash from '@/app/shared/assets/Trash';
import DeleteModal from '@/app/shared/inventory/DeleteModal';
import TrackImage from '../TrackImage';
import { useModal } from '@ebay/nice-modal-react';
import useDeleteTrack from '@/utils/hooks/tracks/useDeleteTrack';

export default function Track({
  track,
  selectedTrack,
  setSelectedTrack,
}: {
  track: TrackInstance;
  selectedTrack: MutableRefObject<Howl> | undefined;
  setSelectedTrack: (t: MutableRefObject<Howl> | undefined) => void;
}) {
  const trackDeleteModal = useModal(DeleteModal);
  const deleteTrack = useDeleteTrack(track.templateId);

  const howlRef = useRef(
    new Howl({
      src: track.body.audioUrlWav,
    })
  );

  return (
    <>
      <div className='flex w-full items-center justify-between border-b border-gray-42 py-2 px-3'>
        <div
          onClick={() => {
            if (selectedTrack === howlRef) {
              setSelectedTrack(undefined);
            } else {
              setSelectedTrack(howlRef);
            }
          }}
          className='flex items-center gap-2 cursor-pointer'
        >
          <TrackImage
            isPlaying={selectedTrack === howlRef}
            trackName={track.name}
            artworkImageUrl={track.body.artworkImageUrl}
          />
          <p
            className={`text-base font-bold truncate  ${
              selectedTrack == howlRef ? 'text-purple-9a' : 'text-white'
            }  `}
          >
            {track.name}
          </p>
        </div>
        <div
          className='cursor-pointer'
          onClick={() => {
            // make sure to stop it if it's playing.
            if (howlRef === selectedTrack) {
              setSelectedTrack(undefined);
            }

            trackDeleteModal.show({
              deleter: deleteTrack,
            });
          }}
        >
          <Trash />
        </div>
      </div>
    </>
  );
}

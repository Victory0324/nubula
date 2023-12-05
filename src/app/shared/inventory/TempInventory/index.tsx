import {
  useState,
  useEffect,
  useMemo,
  MutableRefObject,
  useCallback,
} from 'react';
import { useTracks } from '@/app/providers/tracks';
import Loading from '@/app/shared/assets/Loading';
import EmptyTrackList from '@/app/shared/inventory/TrackListEmpty';
import { ErrorMessage } from '@/app/shared/ErrorMessage';
import { Howl } from 'howler';
import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';
import FreeTrackCount from './FreeTrackCount';
import Track from './Track';
import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Sidebar from '@/app/shared/Sidebar';

export default NiceModal.create(function TempInventory() {
  const modal = useModal();
  const { setPlaying } = useAudioPlayer();
  const { tracks, loading, error } = useTracks();
  const [selectedTrack, setSelectedTrackState] =
    useState<MutableRefObject<Howl>>();

  const freeTracks = useMemo(() => {
    return tracks.filter((t) => !t.tokenId);
  }, [tracks]);

  useEffect(() => {
    setPlaying(false);
  }, [setPlaying]);

  useEffect(() => {
    const lastRef = selectedTrack?.current;

    return () => {
      // onunmount we want to make sure no howl instance is playing.
      lastRef?.stop();
    };
  }, [selectedTrack]);

  const setSelectedTrack = useCallback(
    (newSelectedTrack: MutableRefObject<Howl> | undefined) => {
      // ensures we only play one track at a time.
      setSelectedTrackState((track) => {
        track?.current.pause();
        newSelectedTrack?.current.play();
        return newSelectedTrack;
      });
    },
    []
  );

  if (!modal.visible) {
    return null;
  }

  return (
    <div className='bg-gray-13 h-full w-full fixed right-0 z-10 md:w-4/12 top-0 botton-0 '>
      <Sidebar
        header={
          <div>
            <div className='flex justify-between items-center p-2'>
              <div className='flex-grow'>
                <h2 className='text-xl text-center font-bold uppercase'>
                  delete free tracks
                </h2>
              </div>
              <X className='cursor-pointer' onClick={modal.remove} />
            </div>
            <FreeTrackCount count={freeTracks.length} />
          </div>
        }
        footer={
          <div className='flex gap-4 p-2'>
            <button
              onClick={modal.remove}
              className='btn btn-secondary btn-pinched-br w-1/2'
            >
              Go back
            </button>
            <button
              onClick={modal.remove}
              className='btn btn-primary btn-pinched-bl w-1/2'
            >
              Save and Continue
            </button>
          </div>
        }
      >
        <ul>
          {loading ? (
            <div className='flex justify-center mt-8'>
              <Loading />
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : tracks?.length ? (
            freeTracks.map((t) => {
              return (
                <Track
                  key={t.instanceId}
                  track={t}
                  selectedTrack={selectedTrack}
                  setSelectedTrack={setSelectedTrack}
                />
              );
            })
          ) : (
            <EmptyTrackList />
          )}
        </ul>
      </Sidebar>
    </div>
  );
});

import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { useOutputTrack } from '@/app/providers/outputTrack';
import TrackLimitModal from '@/app/shared/inventory/TrackLimitModal';
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import useCompleteOn3Quest from '../quests/on3/useTrackOn3Quest';
import usePatchTrack from '../tracks/usePatchTrack';
import usePostTrack, { TrackLimitExceededError } from '../tracks/usePostTrack';
import { useModal } from '@ebay/nice-modal-react';
import Toast from '@/app/shared/Toasts/Toast';
import usePatchStem from '../stems/usePatchStem';
import { useTracks } from '@/app/providers/tracks';
import { useIsStemUnlocked } from '../stems/useIsStemUnlocked';

export default function useSaveInstance() {
  const isStemUnlocked = useIsStemUnlocked();
  const patchStem = usePatchStem();
  const trackLimitModal = useModal(TrackLimitModal);
  const { setOutputTrack } = useOutputTrack();
  const { tracks } = useTracks();
  const { currentTrack, trackType } = useAudioPlayer();
  const patchTrack = usePatchTrack();
  const postTrack = usePostTrack();
  const completeOn3Quest = useCompleteOn3Quest();
  const [isSaving, setIsSaving] = useState(false);

  const allowSave = useMemo(() => {
    if (trackType === 'input') {
      return isStemUnlocked(currentTrack as InputStem);
    } else if (trackType === 'output') {
      const inventoryTrack = tracks.find(
        (trackInstance) =>
          trackInstance.instanceId === (currentTrack as OutputTrack)?.instanceId
      );
      if (inventoryTrack && inventoryTrack.tokenId) return false;
      return true;
    }
  }, [currentTrack, isStemUnlocked, trackType, tracks]);

  const onSaveSuccess = useCallback(
    ({ name }: { name?: string }) => {
      toast(<Toast type='success' title={`${name || 'Track'} saved.`} />);

      completeOn3Quest('SAVE_ONE_TRACK');
    },
    [completeOn3Quest]
  );

  const handleSave = useCallback(
    async (newName?: string) => {
      if (trackType === 'empty' || !currentTrack) return;

      setIsSaving(true);

      if (trackType === 'input') {
        patchStem({
          stem: currentTrack as InputStem,
          title: newName,
          shouldFavorite: false,
        });
      } else if (trackType === 'output') {
        const track = currentTrack as OutputTrack;

        if (track.instanceId) {
          await patchTrack({
            trackId: track.instanceId,
            title: newName || track.generatedTrackName,
            isFavourite: !!track.isFavourite,
          });
          onSaveSuccess({ name: newName || track.generatedTrackName });
        } else {
          let instanceId;

          const newTrack = {
            ...track,
            name: newName || track.name,
          };

          try {
            instanceId = await postTrack({
              outputTrack: newTrack,
            });
            onSaveSuccess({ name: newName || track.name });
          } catch (err) {
            if (err instanceof TrackLimitExceededError) {
              trackLimitModal.show();
            } else if (err instanceof Error) {
              toast(
                <Toast
                  type='error'
                  title={'Sorry, something went wrong'}
                  body={'Please try again.'}
                />
              );
            } else {
              console.error(err);
            }
          }

          if (instanceId) {
            setOutputTrack({ ...newTrack, instanceId });
          }
        }

        setIsSaving(false);
      }
    },
    [
      trackType,
      currentTrack,
      patchStem,
      patchTrack,
      onSaveSuccess,
      postTrack,
      trackLimitModal,
      setOutputTrack,
    ]
  );

  return { allowSave, handleSave, isSaving };
}

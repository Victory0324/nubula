import usePostTrack from '@/utils/hooks/tracks/usePostTrack';
import usePatchTrack from '@/utils/hooks/tracks/usePatchTrack';
import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useCallback, useMemo, useState } from 'react';
import usePatchStem from '../stems/usePatchStem';
import { getStemFavorited } from '@/utils/helpers/stems';

export default function useFavorite({
  newTrackName,
}: {
  newTrackName: string;
}) {
  const { currentTrack, trackType } = useAudioPlayer();
  const { outputTrack, setOutputTrack } = useOutputTrack();
  const { inventoryStems } = useStems();
  const [creating, setCreating] = useState(false);
  const patchStem = usePatchStem();
  const patchTrack = usePatchTrack();
  const postTrack = usePostTrack();

  const favorite = useCallback(async () => {
    if (trackType === 'empty' || !currentTrack) return;

    if (trackType === 'input') {
      await patchStem({
        stem: currentTrack as InputStem,
        title: newTrackName,
        shouldFavorite: true,
      });
    } else {
      const favorited = !(currentTrack as OutputTrack).isFavourite;

      const track = currentTrack as OutputTrack;

      // optimistically set favorited
      setOutputTrack({ ...track, isFavourite: favorited });

      let instanceId = track.instanceId;

      if (!instanceId) {
        if (outputTrack) {
          setCreating(true);
          instanceId = await postTrack({ outputTrack });
          setOutputTrack({ ...track, instanceId, isFavourite: favorited });
          setCreating(false);
          if (!instanceId) return;
        }
      } else {
        setOutputTrack({ ...track, instanceId, isFavourite: favorited });
        await patchTrack({
          trackId: instanceId,
          title: track.name || track.generatedTrackName,
          isFavourite: favorited,
        });
      }
    }
  }, [
    currentTrack,
    newTrackName,
    outputTrack,
    patchStem,
    patchTrack,
    postTrack,
    setOutputTrack,
    trackType,
  ]);

  const isFavorite = useMemo(() => {
    if (currentTrack === outputTrack) return outputTrack?.isFavourite;

    return getStemFavorited(inventoryStems, currentTrack as InputStem);
  }, [currentTrack, outputTrack, inventoryStems]);

  const disabled = useMemo(() => {
    return !currentTrack;
  }, [currentTrack]);

  return { favorite, isFavorite, disabled, creating };
}

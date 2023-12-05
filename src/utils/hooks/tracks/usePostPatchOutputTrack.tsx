import { useOutputTrack } from '@/app/providers/outputTrack';
import usePatchTrack from './usePatchTrack';
import usePostTrack from './usePostTrack';
import { useCallback } from 'react';

export default function usePostPatchOutputTrack() {
  const postTrack = usePostTrack();
  const patchTrack = usePatchTrack();
  const { outputTrack, setOutputTrack } = useOutputTrack();

  const postPatch = useCallback(
    async (track: OutputTrack) => {
      // optimistic update
      setOutputTrack(track);

      if (!track.instanceId) {
        if (outputTrack) {
          try {
            await postTrack({
              outputTrack: track,
            });

            const newOutput = {
              ...track,
              instanceId: track.instanceId,
            };
            setOutputTrack(newOutput);
            return newOutput;
          } catch (err) {
            setOutputTrack(outputTrack);
            throw err;
          }
        }
      } else {
        try {
          await patchTrack({
            trackId: track.instanceId,
            title: track.name || track.generatedTrackName,
            isFavourite: track.isFavourite || false,
          });

          return track;
        } catch (err) {
          setOutputTrack(outputTrack);
          throw err;
        }
      }
    },
    [postTrack, patchTrack, outputTrack, setOutputTrack]
  );

  return postPatch;
}

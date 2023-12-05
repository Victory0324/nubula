import { useCallback, useMemo, useState } from 'react';
import { useAnalytics } from '@/app/providers/analytics';
import { saveAs } from 'file-saver';
import { useTracks } from '@/app/providers/tracks';
import createZipFile from '@/utils/api/authenticated/elyxnir/inventory/create-zip-file';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';

export default function useDownload(itemId: string | undefined) {
  const { tracks } = useTracks();
  const [preparing, setPreparing] = useState(false);

  const { track: trackEvent } = useAnalytics();

  const currentTrack = useMemo(() => {
    return tracks.find((t) => t.body.itemId == itemId);
  }, [tracks, itemId]);

  const download = useCallback(async () => {
    if (currentTrack) {
      setPreparing(true);
      const { data, success, message } = await createZipFile(
        currentTrack.instanceId
      );
      setPreparing(false);
      if (success && data) {
        saveAs(data, `${currentTrack.name}.zip`);

        trackEvent({
          category: 'song',
          action: 'download',
          name: currentTrack.body.itemId,
        });
        toast(
          <Toast
            type='success'
            title='File saved successfully'
            body={`Saved to ${currentTrack.name}.zip`}
          />
        );
      } else {
        toast(
          <Toast type='error' title='Error preparing download' body={message} />
        );
      }
    }
  }, [trackEvent, currentTrack]);

  return { preparing, download };
}

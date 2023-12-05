import { getOutputMetadata } from '@/utils/api/soundMosaic/outputMetadata';
import { useState, useEffect } from 'react';

export default function useGetOutputTrack({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState<OutputTrack>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const t = await getOutputMetadata({ trackid: id });
      setTrack(t);
      setLoading(false);
    })();
  }, [id]);

  return { outputTrack: track, loading };
}

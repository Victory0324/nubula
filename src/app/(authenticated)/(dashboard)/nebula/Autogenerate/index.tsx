import { useMints } from '@/app/providers/mints';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useCanClaimAutogenerate } from '@/utils/api/authenticated/elyxnir/userProfile/player/autogenerate/getCanClaim';
import { usePatchCanClaimAutogenerate } from '@/utils/api/authenticated/elyxnir/userProfile/player/autogenerate/patchCanClaim';
import { getOutputTrack } from '@/utils/api/soundMosaic/outputTrack';
import useSuggestedStem from '@/utils/hooks/stems/useSuggestedStem';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCurrentUser } from '@/app/providers/User';

import Image from 'next/image';

import AutogenerateImg from './assets/autogenerate.png';
import { isDevOrPreview } from '@/utils/helpers/env';
import { useAnalytics } from '@/app/providers/analytics';
import { useSettings } from '@/app/providers/settings';
import { useAudioPlayer } from '../providers/audioPlayer';
import { useRouter } from '@/app/providers/router';

const CLAIM_INTERVAL = 1000 * 60 * 5; // 5 minutes

export default function Autogenerate() {
  const router = useRouter();
  const { getSuggestedStem, loading } = useSuggestedStem();
  const { creating, outputTrack, setOutputTrack } = useOutputTrack();
  const { autogenerateCheck } = useSettings();
  const { unlockedIds } = useMints();
  const { user } = useCurrentUser();
  const { track } = useAnalytics();
  const { setPlaying } = useAudioPlayer();

  const canClaimAutogenerate = useCanClaimAutogenerate();
  const patchCanClaimAutogenerate = usePatchCanClaimAutogenerate();

  const [canClaim, setCanClaim] = useState(false);
  const [autogeneratedTrack, setAutogeneratedTrack] = useState<OutputTrack>();

  const checkCanClaim = useCallback(async () => {
    // optional bypass check for testing purposes
    if (!autogenerateCheck && isDevOrPreview()) {
      setCanClaim(true);
      return;
    }

    const { success, data } = await canClaimAutogenerate();
    setCanClaim(success && data?.canClaimAutogeneratedTrack);
  }, [autogenerateCheck, canClaimAutogenerate]);

  useEffect(() => {
    checkCanClaim();

    const intervalId = setInterval(checkCanClaim, CLAIM_INTERVAL);

    return () => clearInterval(intervalId);
  }, [canClaim, canClaimAutogenerate, checkCanClaim]);

  const trackAvailable = useMemo(() => {
    return !!(
      canClaim &&
      !creating &&
      !outputTrack?.instanceId &&
      autogeneratedTrack
    );
  }, [autogeneratedTrack, canClaim, creating, outputTrack?.instanceId]);

  const generate = useCallback(async () => {
    const stemId = getSuggestedStem();
    try {
      const output = await getOutputTrack({
        stemId,
        unlockIds: unlockedIds,
        creator: user?.displayName,
      });

      setAutogeneratedTrack(output);
    } catch (err) {
      console.error(err);
    }
  }, [getSuggestedStem, unlockedIds, user?.displayName]);

  useEffect(() => {
    if (canClaim && !loading && unlockedIds?.length) {
      generate();
    }
  }, [canClaim, generate, getSuggestedStem, loading, unlockedIds]);

  const handleClick = useCallback(() => {
    if (trackAvailable && autogeneratedTrack) {
      track({
        category: 'song',
        action: 'autogenerate',
        name: autogeneratedTrack.itemId,
      });
      track({
        category: 'song',
        action: 'source',
        name: autogeneratedTrack.inputStemId,
      });
      setOutputTrack(autogeneratedTrack);
      patchCanClaimAutogenerate();
      setCanClaim(false);
      setAutogeneratedTrack(undefined);
      setPlaying(true);
      router.push('/output');
    }
  }, [
    trackAvailable,
    autogeneratedTrack,
    track,
    setOutputTrack,
    patchCanClaimAutogenerate,
    setPlaying,
    router,
  ]);

  if (!trackAvailable) return null;

  return (
    <div className='absolute top-5 right-5 m-2'>
      <button
        onClick={handleClick}
        className='flex gap-2 rounded-full px-4 py-2 items-center justify-center transition-colors hover:border-green-92 bg-green-92/10'
      >
        <div className='rounded-full w-2 h-2 bg-green-92' />
        <span className='text-[12px] text-white font-normal leading-5'>
          Track Available!
        </span>
      </button>
    </div>
  );
}

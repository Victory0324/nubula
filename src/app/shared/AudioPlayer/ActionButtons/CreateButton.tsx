import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useMints } from '@/app/providers/mints';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useIsStemUnlocked } from '@/utils/hooks/stems/useIsStemUnlocked';

import { useMemo } from 'react';

const CreateButton = () => {
  const isStemUnlocked = useIsStemUnlocked();
  const { selectedStem } = useStems();

  const isUnlocked = useMemo(
    () => isStemUnlocked(selectedStem),
    [isStemUnlocked, selectedStem]
  );
  const { creating, createTrack } = useOutputTrack();

  return (
    <button
      disabled={creating || !isUnlocked}
      className='btn btn-primary btn-pinched-bl w-full'
      onClick={() => createTrack()}
    >
      Create
    </button>
  );
};

export default CreateButton;

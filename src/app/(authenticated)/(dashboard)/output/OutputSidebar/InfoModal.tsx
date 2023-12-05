import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useStems } from '../../nebula/providers/stems';
import { useMemo } from 'react';

export default function InfoModal({
  shown,
  close,
}: {
  shown: boolean;
  close: Function;
}) {
  const { outputTrack } = useOutputTrack();
  const { stems } = useStems();

  const stem = useMemo(() => {
    if (outputTrack) {
      const stem = stems.find((s) => s.itemId === outputTrack.inputStemId);

      return stem;
    }
  }, [outputTrack, stems]);

  if (!shown) return null;

  const handleCancel = () => {
    close();
  };

  return (
    <Modal {...{ close }}>
      <CenteredModalContent>
        <div className='min-w-[327px] p-8 flex flex-col items-center'>
          <div className='text-2xl font-extrabold mb-3'>
            {stem ? stem?.trackArtist : 'no output track selected'}
          </div>
          <div className='text-sm font-[350] text-center text-white/50'>
            {stem &&
              `Your track was generated from a "${stem?.trackTitle}" stem.`}
          </div>

          <div className='flex mt-3 w-full'>
            <button
              className='btn btn-secondary btn-pinched-br w-full'
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
        </div>
      </CenteredModalContent>
    </Modal>
  );
}

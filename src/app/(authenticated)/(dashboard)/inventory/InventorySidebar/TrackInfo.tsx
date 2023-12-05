import { Popover } from '@headlessui/react';
import Info from '../assets/Info';
import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useMemo } from 'react';

type Props = {
  inputStemId?: string;
};

export default function TrackInfo({ inputStemId = 'unknown' }: Props) {
  const { stems } = useStems();
  // Unfortunately there is not enough info instance.body.stems
  // So need to load them from the other api - but they should already be loaded.
  const stem = useMemo(
    () => stems.find((s) => s.itemId == inputStemId),
    [inputStemId, stems]
  );

  return (
    <div>
      <Popover as='div' className='relative w-full'>
        <Popover.Button className='flex items-center'>
          <Info className='hover:text-purple-9a transition-colors' />
        </Popover.Button>
        <Popover.Panel className='border border-gray-999 rounded-2xl min-w-[250px] absolute mt-2 -left-100 -right-0 bg-gray-13 z-10'>
          <div className='p-4 flex flex-col items-center text-center'>
            <div className='text-xl font-extrabold mb-3'>
              {stem?.trackArtist}
            </div>
            <div className='text-sm mb-4 text-center text-white/50'>
              <p>
                This track was generated from{' '}
                <span className='text-purple-9a'>{stem?.trackTitle}</span>
              </p>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

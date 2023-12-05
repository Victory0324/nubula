import { useTour } from '@/app/providers/tour';
import { useEffect } from 'react';
import { isMobile } from '@/utils/helpers/env';

const Control = ({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick: () => void }>) => (
  <div
    {...{ onClick }}
    className='select-none hover:cursor-pointer hover:border-white/50 w-9 h-9 rounded-xl border border-white/25 backdrop-blur bg-white/5 text-white font-[18px] flex items-center justify-center transition-colors'
  >
    {children}
  </div>
);

export default function ZoomControls({
  onZoom,
}: {
  onZoom: (scaleVal: number) => void;
}) {
  const { addStep } = useTour();

  useEffect(() => {
    addStep({
      step: {
        disableBeacon: true,
        target: '#zoom-controls',
        title: 'Zoom in and out',
        content: (
          <>
            <span className='text-gray-999'>
              Easily zoom in and out of the Nebula{' '}
            </span>
            <span className='text-purple-9a'>
              using your mouse wheel to focus on specific star clusters
            </span>
            <span className='text-gray-999'>
              , or utilize the zoom buttons on the interface for smooth
              navigation.
            </span>
          </>
        ),
      },
      index: isMobile() ? 2 : 3,
    });
  }, [addStep]);

  return (
    <div
      id='zoom-controls'
      className='absolute max-sm:left-0 max-sm:bottom-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-9 flex lg:flex-col gap-4 m-4'
    >
      <div className='max-sm:hidden'>
        <Control onClick={() => onZoom(1.25)}>+</Control>
      </div>
      <div className='max-sm:hidden'>
        <Control onClick={() => onZoom(0.75)}>-</Control>
      </div>
    </div>
  );
}

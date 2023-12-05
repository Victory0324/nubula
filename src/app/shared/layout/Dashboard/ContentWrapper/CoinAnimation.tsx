import { useCurrency } from '@/app/providers/currency';
import Coin from '@/app/shared/assets/Coin';
import { Transition } from '@headlessui/react';
import { useEffect } from 'react';

export default function CoinAnimation() {
  const { showAnimationValue, setShowAnimationValue } = useCurrency();

  useEffect(() => {
    if (showAnimationValue) {
      const t = setTimeout(() => {
        setShowAnimationValue(undefined);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [setShowAnimationValue, showAnimationValue]);

  return (
    <div className='absolute z-[100] top-[40px] left-[170px]'>
      <>
        <Transition
          appear={true}
          show={showAnimationValue !== undefined}
          className='relative'
        >
          <Transition.Child
            enterFrom='opacity-0 transform translate-y-16 rotate-[-90deg]'
            enterTo='opacity-100 transform translate-y-0 rotate-0'
            leaveFrom='opacity-100 transform translate-y-0 rotate-0'
            leaveTo='opacity-0 transform translate-y-16 rotate-[-90deg]'
            className={`transition-all duration-[500ms] ${
              showAnimationValue ? '' : 'delay-300'
            }`}
          >
            <Coin className='w-[150px] h-[150px]' />
          </Transition.Child>
          <Transition.Child
            enterFrom='opacity-0 transform translate-y-16'
            enterTo='opacity-100 transform translate-y-0'
            leaveFrom='opacity-100 transform translate-y-0'
            leaveTo='opacity-0 transform translate-y-16'
            className={`transition-all duration-[500ms] delay-150`}
          >
            <div className='text-center text-white text-2xl font-bold absolute top-[-30px] w-full'>
              +{showAnimationValue?.value} Noiz
            </div>
          </Transition.Child>
          <Transition.Child
            enterFrom='opacity-0 transform translate-y-8 '
            enterTo='opacity-100 transform translate-y-0'
            leaveFrom='opacity-100 transform translate-y-0'
            leaveTo='opacity-0 transform translate-y-8 '
            className={`transition-all duration-[500ms] ${
              showAnimationValue ? 'delay-300' : ''
            }`}
          >
            <div className='mt-2.5 w-full text-center text-white text-sm font-medium'>
              {showAnimationValue?.rewardId.includes('daily')
                ? 'Daily Bonus'
                : 'Track Created'}
            </div>
          </Transition.Child>
        </Transition>
      </>
    </div>
  );
}

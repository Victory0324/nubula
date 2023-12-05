import ListItem from './Listitem';

import { useBackgrounds } from '@/app/providers/backgrounds';
import ScenZBuySelectButton from './BuySelectButton';

const ScenZSidebar = () => {
  const { availableBackgrounds } = useBackgrounds();

  return (
    <>
      <div className='px-5 py-5'>
        <div
          className='
          pb-3
          text-xl
        '
        >
          <div>Your Backgrounds</div>
        </div>
      </div>
      <div className='px-5 overflow-y-scroll no-scrollbar flex-grow h-full overflow-x-hidden'>
        <div
          className='
          lg:grow
          lg:h-full

          lg:border-none

          !px-0
          !pt-0

          overflow-y-scroll
          no-scrollbar

          gradient-scroll

          grid grid-cols-2 gap-4
          content-start
        '
        >
          {availableBackgrounds.map((background, i) => (
            <ListItem {...{ background }} key={background.name} />
          ))}
        </div>
      </div>
      <div className='flex justify-center gap-4 max-sm:mt-8 my-5 overflow-x-hidden'>
        <ScenZBuySelectButton />
      </div>
    </>
  );
};

export default ScenZSidebar;

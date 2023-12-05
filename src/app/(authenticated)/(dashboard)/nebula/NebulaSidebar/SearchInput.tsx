import { useTour } from '@/app/providers/tour';
import { useStems } from '../providers/stems';
import SearchInput from '@/app/shared/SearchInput';
import { useEffect } from 'react';
import { isMobile } from '@/utils/helpers/env';

const NebulaSearchInput = () => {
  const { searchValue, setSearchValue } = useStems();
  const { addStep } = useTour();

  useEffect(() => {
    addStep({
      step: {
        disableBeacon: true,
        target: '#nebula-search-input',
        title: 'Filters',
        content: (
          <>
            <span className='text-purple-9a'>
              You can search for stems using the search bar or by the Filters.
            </span>
            <span className='text-gray-999'>
              {' '}
              The Nebula shape will change to help you in your search for your
              dream stem.
            </span>
          </>
        ),
      },
      index: isMobile() ? 3 : 4,
    });
  }, [addStep]);

  return (
    <div id='nebula-search-input'>
      <SearchInput value={searchValue} setValue={setSearchValue} />
    </div>
  );
};

export default NebulaSearchInput;

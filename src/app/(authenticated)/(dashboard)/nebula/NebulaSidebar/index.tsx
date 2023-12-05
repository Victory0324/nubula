'use client';

import { useState } from 'react';
import Toggler from './Toggler';
import NebulaSearchInput from './SearchInput';
import GenreFilter from './Panel/Filters/GenreFilter';
import ArtistFilter from './Panel/Filters/ArtistFilter';
import { useStems } from '../providers/stems';
import { useOutputTrack } from '@/app/providers/outputTrack';
import Dropdown from '@/app/shared/Dropdown';
import Check from '../assets/Check';
import Heart from '@/app/shared/assets/Heart';
import MoodFilter from './Panel/Moods';

const NebulaSidebar = () => {
  const { mintedFilter, setMintedFilter, favoritesFilter, setFavoritesFilter } =
    useStems();
  const [panel, setPanel] = useState('genre');

  const { selectedStem } = useStems();
  const { outputTrack } = useOutputTrack();

  return (
    <>
      <div className='px-5 py-5'>
        <div className='mb-4 flex justify-between'>
          <div className={`w-full`}>
            <Toggler
              items={['Genre', 'Artist', 'Mood']}
              selected={panel}
              onSelect={setPanel}
            />
          </div>
        </div>
        {panel !== 'mood' && (
          <>
            <div className='h-12 pb-16'>
              <NebulaSearchInput />
            </div>
            <div className='h-12 pb-14 mt-2 lg:mt-0'>
              <div className='flex flex-none flex-row '>
                <div className='flex items-center w-[160px]'>
                  <Dropdown<typeof favoritesFilter>
                    items={[
                      { value: 'all', icon: <Check /> },
                      { value: 'favorites', icon: <Heart /> },
                    ]}
                    selected={favoritesFilter}
                    onSelect={setFavoritesFilter}
                  />
                </div>
                <div className='flex flex-1 ml-4 justify-end'>
                  <Toggler
                    items={['ALL', 'LOCKED', 'UNLOCKED']}
                    selected={mintedFilter}
                    onSelect={setMintedFilter}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='px-5 overflow-y-scroll no-scrollbar flex-grow h-full'>
        <div
          className={`
          h-full
            // If there is a current selected track, pad the bottom of the filter page to account for overlap
            ${selectedStem || outputTrack ? 'mb-[250px]' : ''}
            lg:mb-0

        `}
        >
          <div className={`h-full ${panel === 'genre' ? 'visible' : 'hidden'}`}>
            <GenreFilter />
          </div>
          <div
            className={`h-full ${panel === 'artist' ? 'visible' : 'hidden'}`}
          >
            <ArtistFilter />
          </div>
          <div className={`h-full ${panel === 'mood' ? 'visible' : 'hidden'}`}>
            <MoodFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default NebulaSidebar;

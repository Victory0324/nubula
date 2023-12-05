import { Menu } from '@headlessui/react';
import AtoZ from '../assets/AtoZ';
import ZtoA from '../assets/ZtoA';
import DownArrow from '@/app/shared/assets/DownArrow';

export enum TrackListSortDirection {
  Asc = 1,
  Desc = 0,
}

export enum TrackListSortType {
  artistLabel = 'Artist/Label',
  favorites = 'Favorites',
  owned = 'Owned',
  // NB: the api doesn't return
  // any datetime fields. I'm waiting
  // on a message from James.
  // For right now recent is handled
  // exactly the same as default.
  recent = 'Recent',
  default = '',
}

export default function TrackListSort({
  allowArtistLabel = true,
  sortBy,
  direction,
  sortHandler,
}: {
  allowArtistLabel?: boolean;
  sortBy: string;
  direction: TrackListSortDirection;
  sortHandler: (item: TrackListSortType) => void;
}) {
  return (
    <>
      <Menu as='div' className='relative w-full'>
        {({ open }) => (
          <div>
            <div>
              <Menu.Button className='hover:text-white/75 transition-colors font-medium inline-flex rounded-md py-2 text-xs text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 gap-2 items-center'>
                <span className='text-xs text-gray-84'>Sort</span>
                {sortBy}
                <DownArrow />
              </Menu.Button>
            </div>
            {open && (
              <Menu.Items
                className='bg-gray-13 border border-gray-999 rounded-2xl w-54 -right-0 -left-100 absolute mt-2 divide-y divide-white/25 ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
                static
              >
                {Object.values(TrackListSortType)
                  .filter((item) => item != TrackListSortType.default)
                  .filter((item) => allowArtistLabel || item != 'Artist/Label')
                  .map((item) => (
                    <Menu.Item key={item}>
                      <button
                        onClick={(e) => {
                          // behaviour:
                          // on first click - switch to desc
                          // on 2nd click - switch to default sort
                          // Prevent default is needed to avoid the
                          // the menu auto closing.
                          e.preventDefault();
                          sortHandler(item);
                        }}
                        className={`${
                          sortBy === item
                            ? 'text-purple-9a'
                            : 'text-white hover:text-purple-9a'
                        } transition-colors group flex w-full items-center  p-4 text-sm gap-4`}
                      >
                        {direction ? <AtoZ /> : <ZtoA />}
                        {item}
                      </button>
                    </Menu.Item>
                  ))}
              </Menu.Items>
            )}
          </div>
        )}
      </Menu>
    </>
  );
}

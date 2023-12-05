import Track from './Track';
import EmptyTrackList from '@/app/shared/inventory/TrackListEmpty';
import { useState, useCallback } from 'react';
import useTracksFiltered from '@/utils/hooks/tracks/useTracksFiltered';
import TrackListSort, {
  TrackListSortDirection,
  TrackListSortType,
} from './TrackListSort';
import SearchInput from '@/app/shared/SearchInput';
import TrackListHeader from './TrackListHeader';
import TrackLimit from './TrackLimit';
import Loading from '@/app/shared/assets/Loading';
import { ErrorMessage } from '@/app/shared/ErrorMessage';
import Toggler from '../../nebula/NebulaSidebar/Toggler';
import { TabProps } from '.';
import { useSettings } from '@/app/providers/settings';

export default function TrackList({ currentTab, setCurrentTab }: TabProps) {
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState(TrackListSortType.default);
  const [direction, setDirection] = useState(TrackListSortDirection.Asc);
  const { videoInventory } = useSettings();

  const { tracks, loading, error } = useTracksFiltered(
    searchValue,
    sortBy,
    direction
  );

  const sortHandler = useCallback(
    (item: TrackListSortType) => {
      if (item != sortBy) {
        setSortBy(item);
        // always start on asc
        setDirection(TrackListSortDirection.Asc);
      } else {
        if (direction == TrackListSortDirection.Desc) {
          setSortBy(TrackListSortType.default);
          setDirection(TrackListSortDirection.Asc);
        } else {
          setDirection(+!direction);
        }
      }
    },
    [sortBy, setSortBy, direction, setDirection]
  );

  return (
    <>
      <div className='px-5 pt-5'>
        <div className='flex justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Your Tracks</h2>
          </div>
          <div>
            <TrackListSort
              sortBy={sortBy}
              direction={direction}
              sortHandler={sortHandler}
            />
          </div>
        </div>
        <div className='mb-2'>
          <SearchInput value={searchValue} setValue={setSearchValue} />
        </div>
        {videoInventory && (
          <Toggler
            items={['Tracks', 'Videos']}
            onSelect={setCurrentTab}
            selected={currentTab}
          />
        )}
        <ul>
          <TrackListHeader
            sortHandler={sortHandler}
            sortBy={sortBy}
            direction={direction}
          />
        </ul>
      </div>
      <div className='px-5 overflow-hidden relative'>
        <div className='overflow-y-scroll no-scrollbar flex-grow h-full'>
          <div className='pb-64'>
            <ul>
              {tracks?.length ? (
                tracks.map((t, i) => {
                  return <Track index={i + 1} key={t.instanceId} {...t} />;
                })
              ) : loading ? (
                <div className='flex justify-center mt-8'>
                  <Loading />
                </div>
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <EmptyTrackList />
              )}
            </ul>
            <div className='absolute right-5 bottom-5'>
              <TrackLimit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useCallback } from 'react';
import TrackListSort, {
  TrackListSortDirection,
  TrackListSortType,
} from './TrackListSort';
import SearchInput from '@/app/shared/SearchInput';
import Toggler from '../../nebula/NebulaSidebar/Toggler';
import useVideosFiltered from '@/utils/hooks/videos/useVideosFiltered';
import { ErrorMessage } from '@/app/shared/ErrorMessage';
import EmptyTrackList from '@/app/shared/inventory/TrackListEmpty';
import Loading from '@/app/shared/assets/Loading';
import VideoListItem from './VideoListItem';
import { TabProps } from '.';

export default function VideoList({ currentTab, setCurrentTab }: TabProps) {
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState(TrackListSortType.default);
  const [direction, setDirection] = useState(TrackListSortDirection.Asc);
  const { videos, loading, error } = useVideosFiltered(
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
      <div className='px-5 pt-5 mb-5'>
        <div className='flex justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Your Tracks</h2>
          </div>
          <div>
            <TrackListSort
              sortBy={sortBy}
              direction={direction}
              sortHandler={sortHandler}
              allowArtistLabel={false}
            />
          </div>
        </div>
        <div className='mb-2'>
          <SearchInput value={searchValue} setValue={setSearchValue} />
        </div>
        <Toggler
          items={['Tracks', 'Videos']}
          onSelect={setCurrentTab}
          selected={currentTab}
        />
      </div>
      <div className='px-5 overflow-hidden relative'>
        <div className='overflow-y-scroll no-scrollbar flex-grow h-full'>
          <div className='pb-64'>
            {videos?.length ? (
              <div className='grid grid-cols-2 gap-4'>
                {videos.map((t) => {
                  return <VideoListItem key={t.instanceId} {...t} />;
                })}
              </div>
            ) : loading ? (
              <div className='flex justify-center mt-8'>
                <Loading />
              </div>
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <EmptyTrackList item={'video'} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

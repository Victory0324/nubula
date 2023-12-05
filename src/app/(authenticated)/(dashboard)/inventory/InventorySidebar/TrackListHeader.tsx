import DownArrow from '@/app/shared/assets/DownArrow';
import { TrackListSortDirection, TrackListSortType } from './TrackListSort';

function Direction({ direction }: { direction: TrackListSortDirection }) {
  return !direction ? <DownArrow className={'rotate-180'} /> : <DownArrow />;
}

export default function TrackListHeader({
  sortBy,
  direction,
  sortHandler,
}: {
  sortBy: TrackListSortType;
  direction: TrackListSortDirection;
  sortHandler: (item: TrackListSortType) => void;
}) {
  return (
    <li className='border border-t-0 border-r-0 border-l-0 border-gray-42 p-2'>
      <div className='flex text-3xs font-thin'>
        <div
          onClick={() => sortHandler(TrackListSortType.artistLabel)}
          className={`flex w-3/5 items-center gap-2 cursor-pointer pl-14 ${
            sortBy == TrackListSortType.artistLabel
              ? 'text-purple-9a'
              : 'text-white'
          }`}
        >
          <span>Artist/Label</span>
          {sortBy == TrackListSortType.artistLabel && (
            <Direction direction={direction} />
          )}
        </div>
        <div
          onClick={() => sortHandler(TrackListSortType.owned)}
          className={`flex w-1/5 items-center gap-2 cursor-pointer ${
            sortBy == TrackListSortType.owned ? 'text-purple-9a' : 'text-white'
          }`}
        >
          <span>Owned</span>
          {sortBy == TrackListSortType.owned && (
            <Direction direction={direction} />
          )}
        </div>
        <div
          onClick={() => sortHandler(TrackListSortType.favorites)}
          className={`flex w-1/5 items-center gap-2 cursor-pointer ${
            sortBy == TrackListSortType.favorites
              ? 'text-purple-9a'
              : 'text-white'
          }`}
        >
          <span>Favourited</span>
          {sortBy == TrackListSortType.favorites && (
            <Direction direction={direction} />
          )}
        </div>
      </div>
    </li>
  );
}

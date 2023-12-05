import { useEffect, useState, useCallback } from 'react';
import useFuzzySearch from '@/utils/hooks/search/useFuzzySearch';
import {
  TrackListSortDirection,
  TrackListSortType,
} from '@/app/(authenticated)/(dashboard)/inventory/InventorySidebar/TrackListSort';
import { useVideos } from '@/app/providers/videos';

// keep keys out of the render func so it doesn't trigger a re-render
const keys = ['name'];

export default function useVideosFiltered(
  searchValue: string,
  sortBy: TrackListSortType,
  direction: TrackListSortDirection
) {
  // Extends the useTracks global hook with a filtered params
  const { videos, loading, error } = useVideos();
  const [filteredVideos, setFilteredTracks] = useState<VideoInstance[]>();
  const searcher = useFuzzySearch<VideoInstance>({
    items: videos,
    keys,
    includeScore: true,
  });

  const sort = useCallback(() => {
    const sorted = [...videos].sort((a, b) => {
      switch (sortBy) {
        case TrackListSortType.default:
          return 0;
        case TrackListSortType.recent:
          return 0;
        case TrackListSortType.favorites:
          return Number(!a.isFavourite) - Number(!b.isFavourite);
        case TrackListSortType.owned:
          return Number(!!!a.tokenId) - Number(!!!b.tokenId);
        default:
          throw Error(`Invariant: unknown TrackListSortItem: ${sortBy}`);
      }
    });

    if (direction == TrackListSortDirection.Desc) {
      sorted.reverse();
    }

    setFilteredTracks(sorted);
  }, [setFilteredTracks, videos, sortBy, direction]);

  useEffect(() => {
    sort();
  }, [loading, sort]);

  useEffect(() => {
    if (searchValue) {
      // search
      const searched = searcher(searchValue);

      // now sort.
      const sorted = searched.sort((a, b) => {
        const aScore = a.score || 1;
        const bScore = b.score || 1;

        switch (sortBy) {
          case TrackListSortType.default:
            return aScore - bScore;
          case TrackListSortType.recent:
            return aScore - bScore;
          case TrackListSortType.favorites:
            return (
              Number(!a.item.isFavourite) +
              aScore -
              (Number(!b.item.isFavourite) + bScore)
            );
          case TrackListSortType.owned:
            return (
              Number(!!!a.item.tokenId) +
              aScore -
              (Number(!!!b.item.tokenId) + bScore)
            );
          default:
            throw Error(`Invariant: unknown TrackListSortItem: ${sortBy}`);
        }
      });

      if (direction == TrackListSortDirection.Desc) {
        sorted.reverse();
      }

      setFilteredTracks(sorted.map(({ item }) => item));
    } else {
      sort();
    }
  }, [searchValue, sortBy, sort, searcher, direction]);

  return { videos: filteredVideos, loading, error };
}

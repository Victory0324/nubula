import { useEffect, useState, useCallback } from 'react';
import useFuzzySearch from '@/utils/hooks/search/useFuzzySearch';
import { useTracks } from '@/app/providers/tracks';
import {
  TrackListSortDirection,
  TrackListSortType,
} from '@/app/(authenticated)/(dashboard)/inventory/InventorySidebar/TrackListSort';

// keep keys out of the render func so it doesn't trigger a re-render
const keys = ['name', 'template.body.style'];

export default function useTracksFiltered(
  searchValue: string,
  sortBy: TrackListSortType,
  direction: TrackListSortDirection
) {
  // Extends the useTracks global hook with a filtered params
  // output

  const { tracks, loading, error } = useTracks();
  const [filteredTracks, setFilteredTracks] = useState<TrackInstance[]>();
  const searcher = useFuzzySearch<TrackInstance>({
    items: tracks,
    keys,
    includeScore: true,
  });

  const sort = useCallback(() => {
    const sorted = [...tracks].sort((a, b) => {
      switch (sortBy) {
        case TrackListSortType.default:
          return 0;
        case TrackListSortType.recent:
          return 0;
        case TrackListSortType.favorites:
          return Number(!a.isFavourite) - Number(!b.isFavourite);
        case TrackListSortType.owned:
          return Number(!!!a.tokenId) - Number(!!!b.tokenId);
        case TrackListSortType.artistLabel:
          const artistA = a.body.artists ? a.body.artists[0] : '';
          const artistB = b.body.artists ? b.body.artists[0] : '';
          return artistA.charCodeAt(0) - artistB.charCodeAt(0);
        default:
          throw Error(`Invariant: unknown TrackListSortItem: ${sortBy}`);
      }
    });

    if (direction == TrackListSortDirection.Desc) {
      sorted.reverse();
    }

    setFilteredTracks(sorted);
  }, [setFilteredTracks, tracks, sortBy, direction]);

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
          case TrackListSortType.artistLabel:
            const artistA = a.item.body.artists ? a.item.body.artists[0] : '';
            const artistB = b.item.body.artists ? b.item.body.artists[0] : '';

            return (
              aScore + artistA.charCodeAt(0) - bScore + artistB.charCodeAt(0)
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

  return { tracks: filteredTracks, loading, error };
}

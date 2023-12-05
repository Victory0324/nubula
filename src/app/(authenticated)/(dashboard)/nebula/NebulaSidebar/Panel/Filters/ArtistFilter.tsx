import { useMemo } from 'react';
import { useStems } from '../../../providers/stems';
import Filter from './Filter';

const ArtistFilter = () => {
  const { stems, artistFilter, setArtistFilter } = useStems();

  const items = useMemo(
    () => Array.from(new Set(stems.map((s) => s.trackArtist as string))).sort(),
    [stems]
  );

  return (
    <Filter
      filtered={artistFilter}
      setFiltered={setArtistFilter}
      filterField={'trackArtist'}
      radioGroups={[{ group: 'ARTISTS', items }]}
    />
  );
};

export default ArtistFilter;

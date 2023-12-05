import { useMemo } from 'react';
import { useStems } from '../../../providers/stems';
import Filter from './Filter';

const GenreFilter = () => {
  const { stems, genreFilter, setGenreFilter } = useStems();

  const genres = useMemo(
    () => Array.from(new Set(stems.map((s) => s.style))).sort(),
    [stems]
  );

  return (
    <Filter
      filtered={genreFilter}
      setFiltered={setGenreFilter}
      filterField={'genre'}
      radioGroups={[{ group: 'GENRES', items: genres }]}
    />
  );
};

export default GenreFilter;

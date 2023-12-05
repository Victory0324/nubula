import Fuse from 'fuse.js';
import { useCallback, useMemo } from 'react';

interface Options<T> {
  items: T[];
  keys: Fuse.IFuseOptions<T>['keys'];
  includeScore?: Fuse.IFuseOptions<T>['includeScore'];
}

const useFuzzySearch = <T>({
  items,
  includeScore = true,
  keys,
}: Options<T>) => {
  const fuse = useMemo(
    () => new Fuse<T>(items, { includeScore, keys, threshold: 0.1 }),
    [items, includeScore, keys]
  );

  return useCallback((searchQuery: string) => fuse.search(searchQuery), [fuse]);
};

export default useFuzzySearch;

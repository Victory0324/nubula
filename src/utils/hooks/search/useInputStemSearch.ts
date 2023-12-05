import { useMemo } from 'react';
import useFuzzySearch from './useFuzzySearch';
import { getInventoryStem } from '@/utils/helpers/stems';

const useInputStemSearch = (
  inputStems: InputStem[],
  inventoryStemInstances: Instance[]
) => {
  const keys = useMemo(
    () => ['trackTitle', 'trackArtist', 'genre', 'style', 'category'],
    []
  );

  const items = useMemo(
    () =>
      inputStems.map((inputStem) => ({
        ...inputStem,
        trackTitle:
          getInventoryStem(inputStem, inventoryStemInstances)?.name ||
          inputStem.trackTitle,
      })),
    [inputStems, inventoryStemInstances]
  );

  return useFuzzySearch<InputStem>({
    items,
    keys,
  });
};

export default useInputStemSearch;

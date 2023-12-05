import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import RadioOptions from './RadioOptions';

type FilterProps = {
  radioGroups: { group: string; items: string[] }[];
  filtered: string[];
  setFiltered: Dispatch<SetStateAction<string[]>>;
  filterField: keyof InputStem;
};

const Filter = ({ filtered, setFiltered, radioGroups }: FilterProps) => {
  const onSelect = useCallback(
    (item: string) =>
      item.length
        ? setFiltered((p: string[]) =>
            p.includes(item) ? p.filter((s) => s !== item) : [...p, item]
          )
        : setFiltered([]),
    [setFiltered]
  );

  return (
    <>
      {radioGroups.map(({ group, items }) => (
        <RadioOptions
          key={group}
          {...{ items, onSelect }}
          selected={filtered}
        />
      ))}
    </>
  );
};

export default Filter;

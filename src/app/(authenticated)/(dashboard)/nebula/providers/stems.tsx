'use client';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMints } from '@/app/providers/mints';
import { getInputStems } from '@/utils/api/soundMosaic/inputStems';
import useInputStemSearch from '@/utils/hooks/search/useInputStemSearch';
import { getInventoryInstances } from '@/utils/api/authenticated/elyxnir/inventory/getInstances';
import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { filterStems } from '@/utils/helpers/stems';

type StemsContextType = {
  stems: InputStem[];
  setStems: React.Dispatch<React.SetStateAction<InputStem[]>>;
  selectedOutputStem?: OutputTrackStem;
  setSelectedOutputStem: React.Dispatch<
    React.SetStateAction<OutputTrackStem | undefined>
  >;
  inventoryStems: Instance[];
  setInventoryStems: React.Dispatch<React.SetStateAction<Instance[]>>;
  fetchInventoryStems: () => Promise<void>;
  selectedStem?: InputStem;
  setSelectedStem: React.Dispatch<React.SetStateAction<InputStem | undefined>>;
  filteredStems: InputStem[];
  searchedStems: InputStem[];
  setSearchedStems: React.Dispatch<React.SetStateAction<InputStem[]>>;
  genreFilter: string[];
  favoritesFilter: 'all' | 'favorites';
  artistFilter: string[];
  mintedFilter: string;
  searchValue: string;
  setGenreFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setFavoritesFilter: React.Dispatch<React.SetStateAction<'all' | 'favorites'>>;
  setArtistFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setMintedFilter: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
};

interface StemsProviderProps {
  children: React.ReactNode;
}

const StemsContext = React.createContext<StemsContextType | undefined>(
  undefined
);

export const StemsProvider = ({ children }: StemsProviderProps) => {
  const { unlockedIds, sessionUnlockedIds } = useMints();

  const [stems, setStems] = useState<InputStem[]>([]);
  const [selectedOutputStem, setSelectedOutputStem] =
    useState<OutputTrackStem>();
  const [inventoryStems, setInventoryStems] = useState<Instance[]>([]);
  const [selectedStem, setSelectedStem] = useState<InputStem>();
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [favoritesFilter, setFavoritesFilter] = useState<'all' | 'favorites'>(
    'all'
  );
  const [artistFilter, setArtistFilter] = useState<string[]>([]);
  const [mintedFilter, setMintedFilter] = useState<string>('unlocked');
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const stems = await getInputStems();
      setStems(stems);
      setLoading(false);
    })();
  }, []);

  const getInventoryStemsQuery = useAuthenticatedQuery(
    useCallback(() => getInventoryInstances('Stem'), [])
  );

  const fetchInventoryStems = useCallback(async () => {
    const { success, data } = await getInventoryStemsQuery();
    if (success && data) {
      setInventoryStems(data);
    }
  }, [getInventoryStemsQuery]);

  useEffect(() => {
    fetchInventoryStems();
  }, [fetchInventoryStems, getInventoryStemsQuery]);

  const filteredStems = useMemo(() => {
    return filterStems({
      genreFilter,
      stems,
      artistFilter,
      favoritesFilter,
      mintedFilter,
      inventoryStems,
      unlockedIds,
      sessionUnlockedIds,
    });
  }, [
    genreFilter,
    stems,
    artistFilter,
    favoritesFilter,
    mintedFilter,
    inventoryStems,
    unlockedIds,
    sessionUnlockedIds,
  ]);

  const [searchedStems, setSearchedStems] =
    useState<InputStem[]>(filteredStems);

  const searchInputStems = useInputStemSearch(filteredStems, inventoryStems);

  useEffect(() => {
    if (!searchValue.length) setSearchedStems(filteredStems);
    else
      setSearchedStems(searchInputStems(searchValue).map(({ item }) => item));
  }, [filteredStems, searchInputStems, searchValue]);

  useEffect(() => {
    if (selectedStem && !searchedStems.includes(selectedStem)) {
      // FIXME: This is a chack to fix FSS-1228
      // setSelectedStem(undefined);
    }
  }, [searchedStems, selectedStem]);

  const reset = useCallback(() => {
    setSelectedStem(undefined);
    setGenreFilter([]);
    setArtistFilter([]);
    setMintedFilter('all');
    setFavoritesFilter('all');
    setSearchValue('');
  }, []);

  return (
    <StemsContext.Provider
      value={{
        stems,
        setStems,
        inventoryStems,
        setInventoryStems,
        fetchInventoryStems,
        selectedStem,
        setSelectedStem,
        selectedOutputStem,
        setSelectedOutputStem,
        filteredStems,
        searchedStems,
        setSearchedStems,
        genreFilter,
        setGenreFilter,
        favoritesFilter,
        setFavoritesFilter,
        artistFilter,
        setArtistFilter,
        mintedFilter,
        setMintedFilter,
        reset,
        searchValue,
        setSearchValue,
        loading,
        setLoading,
      }}
    >
      {children}
    </StemsContext.Provider>
  );
};

export const useStems = (): StemsContextType => {
  const context = useContext(StemsContext);
  if (!context) {
    throw new Error('Called useStems before setting StemsProvider context');
  }
  return context;
};

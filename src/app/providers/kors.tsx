'use client';

import useGetKors from '@/utils/hooks/kors/useGetKors';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMints } from './mints';
import usePatchSelectedKor from '@/utils/hooks/kors/selected/usePatchSelectedKor';
import { toast } from 'react-toastify';
import Toast from '../shared/Toasts/Toast';
import { useGLTF } from '@react-three/drei';
import { getKorUnlockIds } from '@/utils/helpers/mints';
import useGetSelectedKor from '@/utils/hooks/kors/selected/useGetSelectedKor';

type ContextType = {
  availableKors: Kor[];
  selectedKorId?: string;
  setSelectedKorId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedKorIndex: number;
  setSelectedKorIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedKor?: Kor;
  previewKorId?: string;
  setPreviewKorId: React.Dispatch<React.SetStateAction<string | undefined>>;
  previewKorIndex: number;
  setPreviewKorIndex: React.Dispatch<React.SetStateAction<number>>;
  previewKor?: Kor;
  previewKorCount: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchKors: () => Promise<void>;
  saveSelectedKor: ({ korUnlockId, selectedIndex = 0 }: KorIdentifier) => void;
  korUnlockIds?: string[];
  getKor: ({ korUnlockId, selectedIndex = 0 }: KorIdentifier) => Kor;
  getKorCount: (unlockId?: string) => number;
  getKorCountByAsset: (asset?: string) => number;
  isGenKorUnlocked?: boolean;
  isGenKorMinted?: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const KorsContext = React.createContext<ContextType | undefined>(undefined);

export type KorIdentifier = {
  korUnlockId?: string;
  selectedIndex?: number;
};

export const KorsProvider = ({ children }: ProviderProps) => {
  const patchSelectedKor = usePatchSelectedKor();
  const getSelectedKor = useGetSelectedKor();

  const getKors = useGetKors();
  const { mints } = useMints();

  const [availableKors, setAvailableKors] = useState([] as Kor[]);

  const [selectedKorId, setSelectedKorId] = useState<string>();
  const [selectedKorIndex, setSelectedKorIndex] = useState<number>(0);
  const [previewKorId, setPreviewKorId] = useState<string>();
  const [previewKorIndex, setPreviewKorIndex] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const fetchKors = useCallback(async () => {
    setLoading(true);

    const { data } = await getKors();

    if (data) {
      setAvailableKors(data as Kor[]);
    }

    setLoading(false);

    return data;
  }, [getKors]);

  useEffect(() => {
    fetchKors();
  }, [fetchKors, mints]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data } = await getSelectedKor();

      setLoading(false);

      if (data) {
        setSelectedKorId(data.korUnlockId);
        setSelectedKorIndex(data.selectedIndex);
      } else {
        setSelectedKorId('kor_genesis');
        setSelectedKorIndex(0);
      }
    })();
  }, [getSelectedKor]);

  const korUnlockIds = useMemo(() => getKorUnlockIds(mints), [mints]);

  const getKor = useCallback(
    ({ selectedIndex = 0 }: KorIdentifier) => {
      if (availableKors.length <= selectedIndex) return availableKors[0];
      return availableKors[selectedIndex];
    },
    [availableKors]
  );

  const getKorCount = useCallback(
    (unlockId?: string) => {
      return availableKors.filter((kor) => kor.korUnlockId === unlockId).length;
    },
    [availableKors]
  );

  const getKorCountByAsset = useCallback(
    (asset?: string) => {
      return availableKors.filter(
        (kor) => kor.korAsset && kor.korAsset === asset
      ).length;
    },
    [availableKors]
  );

  const selectedKor = useMemo(
    () => getKor({ selectedIndex: selectedKorIndex }),
    [getKor, selectedKorIndex]
  );

  const previewKor = useMemo(
    () => getKor({ selectedIndex: previewKorIndex }),
    [getKor, previewKorIndex]
  );

  // correct for misaligned indexes when kor order changes in backend
  useEffect(() => {
    if (availableKors.length <= selectedKorIndex) return;

    if (availableKors[selectedKorIndex]?.korUnlockId !== selectedKorId) {
      const index = availableKors.findIndex(
        (k) => k.korUnlockId === selectedKorId
      );
      setSelectedKorIndex(index);
    }
  }, [availableKors, selectedKorId, selectedKorIndex]);

  useEffect(() => {
    if (availableKors.length <= previewKorIndex) return;

    if (availableKors[previewKorIndex]?.korUnlockId !== previewKorId) {
      const index = availableKors.findIndex(
        (k) => k.korUnlockId === previewKorId
      );
      setPreviewKorIndex(index);
    }
  }, [availableKors, previewKorId, previewKorIndex]);

  const previewKorCount = useMemo(() => {
    if (!previewKor || !mints) {
      return 0;
    }

    return getKorCount(previewKorId);
  }, [previewKor, mints, getKorCount, previewKorId]);

  const saveSelectedKor = useCallback(
    async ({ korUnlockId, selectedIndex = 0 }: KorIdentifier) => {
      if (!korUnlockId) return;

      setSelectedKorId(korUnlockId);
      setSelectedKorIndex(selectedIndex);

      setLoading(true);

      await patchSelectedKor({ korUnlockId, selectedIndex });
      toast(<Toast type='success' title={`KOR saved.`} />);

      setLoading(false);
    },
    [patchSelectedKor]
  );

  // Preload all valid assets
  useEffect(() => {
    availableKors.forEach((kor) => {
      if (kor.korAsset) {
        useGLTF.preload(`renderings/${kor.korUnlockId}.glb`);
      }
    });
  }, [availableKors]);

  useEffect(() => {
    if (selectedKorId && !previewKorId) {
      setPreviewKorId(selectedKorId);
      setPreviewKorIndex(selectedKorIndex);
    }
  }, [previewKorId, selectedKorId, selectedKorIndex]);

  const isGenKorUnlocked = useMemo(() => {
    return availableKors.find((kor) => kor.korUnlockId === 'kor_genesis')
      ?.isKORClaimed;
  }, [availableKors]);

  const isGenKorMinted = useMemo(() => {
    return korUnlockIds.includes('kor_genesis');
  }, [korUnlockIds]);

  return (
    <KorsContext.Provider
      value={{
        availableKors,
        selectedKorId,
        setSelectedKorId,
        selectedKorIndex,
        setSelectedKorIndex,
        previewKorIndex,
        setPreviewKorIndex,
        loading,
        setLoading,
        selectedKor,
        previewKorId,
        setPreviewKorId,
        previewKor,
        previewKorCount,
        fetchKors,
        saveSelectedKor,
        korUnlockIds,
        getKor,
        getKorCount,
        getKorCountByAsset,
        isGenKorUnlocked,
        isGenKorMinted,
      }}
    >
      {children}
    </KorsContext.Provider>
  );
};

export const useKors = (): ContextType => {
  const context = useContext(KorsContext);
  if (!context)
    throw new Error('Called useKors before setting KorsProvider context');

  return context;
};

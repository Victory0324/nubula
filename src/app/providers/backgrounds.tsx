'use client';

import useSceneBackgrounds from '@/utils/hooks/scenz/backgrounds/useBackgrounds';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useKors } from './kors';
import { useGLTF } from '@react-three/drei';
import { toast } from 'react-toastify';
import Toast from '../shared/Toasts/Toast';
import usePatchKor from '@/utils/hooks/kors/usePatchKor';
import { ScenZBackground } from '@/utils/types/scenz';

type ContextType = {
  availableBackgrounds: ScenZBackground[];
  selectedBackground?: ScenZBackground;
  setSelectedBackground: React.Dispatch<
    React.SetStateAction<ScenZBackground | undefined>
  >;
  previewedBackground?: ScenZBackground;
  setPreviewedBackground: React.Dispatch<
    React.SetStateAction<ScenZBackground | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveSelectedBackground: ({
    bg,
    unlockId,
  }: {
    bg: ScenZBackground;
    unlockId: string;
  }) => Promise<void>;
  setPreviewKorForBackground: (bg: ScenZBackground) => void;
  setPreviewBackgroundForKor: (kor: Kor) => void;
  korsForBackground: (bg: ScenZBackground) => Kor[];
};

type ProviderProps = {
  children: React.ReactNode;
};

const BackgroundsContext = React.createContext<ContextType | undefined>(
  undefined
);

export const BackgroundsProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);

  const {
    fetchKors,
    getKor,
    selectedKorId,
    setPreviewKorId,
    previewKorId,
    selectedKor,
    setPreviewKorIndex,
    selectedKorIndex,
  } = useKors();
  const patchKor = usePatchKor();
  const backgrounds = useSceneBackgrounds();

  const [selectedBackground, setSelectedBackground] =
    useState<ScenZBackground>();

  const [previewedBackground, setPreviewedBackground] = useState<
    ScenZBackground | undefined
  >();

  const { availableKors } = useKors();

  const availableBackgrounds = useMemo(() => {
    return backgrounds.filter(
      (background) =>
        !background.unlockIds ||
        background.unlockIds.some(
          (u) => availableKors?.map((k) => k.korUnlockId).includes(u)
        )
    );
  }, [backgrounds, availableKors]);

  const backgroundsForKor = useCallback(
    (kor?: Kor) => {
      if (!kor) return [];
      return availableBackgrounds.filter(
        (b) => !b.unlockIds || b.unlockIds?.includes(kor.korUnlockId)
      );
    },
    [availableBackgrounds]
  );

  const korsForBackground = useCallback(
    (bg: ScenZBackground) => {
      return (
        availableKors?.filter((k) => bg.unlockIds?.includes(k.korUnlockId)) ||
        []
      );
    },
    [availableKors]
  );

  const backgroundsForSelectedKor = useMemo(
    () => backgroundsForKor(selectedKor),
    [backgroundsForKor, selectedKor]
  );

  // preload all background glbs
  useEffect(() => {
    availableBackgrounds.forEach((bg) => {
      if (bg.slug && !bg.custom) {
        useGLTF.preload(`renderings/${bg.slug}.glb`);
      }
    });
  }, [availableBackgrounds, availableKors]);

  // set selected background based on selected kor
  useEffect(() => {
    if (
      selectedKor &&
      !selectedBackground?.unlockIds?.some((u) => u === selectedKor.korUnlockId)
    ) {
      let korBackground;

      if (
        selectedKor.chosenBackground < 0 ||
        selectedKor.chosenBackground > backgroundsForSelectedKor.length - 1
      ) {
        korBackground = availableBackgrounds[0];
      } else {
        korBackground = backgroundsForSelectedKor[selectedKor.chosenBackground];
      }

      setSelectedBackground(korBackground);
      setPreviewedBackground(korBackground);
    }
  }, [
    availableBackgrounds,
    backgroundsForSelectedKor,
    selectedBackground,
    selectedBackground?.unlockIds,
    selectedKor,
  ]);

  // set preview kor based on background
  const setPreviewKorForBackground = useCallback(
    (bg: ScenZBackground) => {
      if (
        !bg?.unlockIds ||
        (selectedKorId && bg.unlockIds.includes(selectedKorId))
      ) {
        setPreviewKorId(selectedKorId);
        setPreviewKorIndex(selectedKorIndex);
      } else if (
        !previewKorId ||
        (previewKorId && !bg.unlockIds.includes(previewKorId))
      ) {
        const newId = bg?.unlockIds.sort()[0];
        setPreviewKorId(newId);
        setPreviewKorIndex(
          availableKors.findIndex((k: Kor) => k.korUnlockId === newId)
        );
      }
    },
    [
      availableKors,
      previewKorId,
      selectedKorId,
      selectedKorIndex,
      setPreviewKorId,
      setPreviewKorIndex,
    ]
  );

  // set preview background based on previewed kor
  const setPreviewBackgroundForKor = useCallback(
    (kor: Kor) => {
      let korBackground;
      const backgrounds = backgroundsForKor(kor);

      if (
        kor.chosenBackground < 0 ||
        kor.chosenBackground > backgrounds.length - 1
      ) {
        korBackground = availableBackgrounds[0];
      } else {
        korBackground = backgrounds[kor.chosenBackground];
      }

      setPreviewedBackground(korBackground);
    },
    [availableBackgrounds, backgroundsForKor]
  );

  const saveSelectedBackground = useCallback(
    async ({ bg, unlockId }: { bg: ScenZBackground; unlockId: string }) => {
      setSelectedBackground(bg);

      const kor = getKor({ korUnlockId: unlockId });
      const backgrounds = backgroundsForKor(kor);
      const backgroundIndex = backgrounds.findIndex((b) => b.name === bg.name);

      setLoading(true);
      await patchKor({ ...kor, chosenBackground: backgroundIndex });
      await fetchKors();
      setLoading(false);

      toast(<Toast type='success' title={`Background applied.`} />);
    },
    [backgroundsForKor, fetchKors, getKor, patchKor]
  );

  return (
    <BackgroundsContext.Provider
      value={{
        availableBackgrounds,
        selectedBackground,
        setSelectedBackground,
        previewedBackground,
        setPreviewedBackground,
        saveSelectedBackground,
        loading,
        setLoading,
        setPreviewKorForBackground,
        setPreviewBackgroundForKor,
        korsForBackground,
      }}
    >
      {children}
    </BackgroundsContext.Provider>
  );
};

export const useBackgrounds = (): ContextType => {
  const context = useContext(BackgroundsContext);
  if (!context)
    throw new Error(
      'Called useBackgrounds before setting BackgroundsProvider context'
    );

  return context;
};

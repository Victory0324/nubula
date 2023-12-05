'use client';

import { useKors } from '@/app/providers/kors';
import Kor3DScene from '@/app/shared/KOR/3DScene';
import { useEffect, useState } from 'react';
import { useBackgrounds } from '@/app/providers/backgrounds';

const ScenZPage = () => {
  const [hasSetInitialPreview, setHasSetInitialPreview] = useState(false);
  const { selectedKor, previewKor, setPreviewKorId } = useKors();
  const { setPreviewBackgroundForKor } = useBackgrounds();

  useEffect(() => {
    if (hasSetInitialPreview) return;
    if (selectedKor) {
      setPreviewKorId(selectedKor.korUnlockId);
      setPreviewBackgroundForKor(selectedKor);
      setHasSetInitialPreview(true);
    }
  }, [
    hasSetInitialPreview,
    selectedKor,
    setPreviewBackgroundForKor,
    setPreviewKorId,
  ]);

  return <Kor3DScene kor={previewKor} />;
};

export default ScenZPage;

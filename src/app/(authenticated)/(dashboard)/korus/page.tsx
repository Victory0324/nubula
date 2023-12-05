'use client';
import KorusSidebar from './KorusSidebar';
import { useKors } from '@/app/providers/kors';
import Kor3DScene from '@/app/shared/KOR/3DScene';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { useEffect, useState } from 'react';
import KorCarousel from './KorCarousel';

const KorusPage = () => {
  const [hasSetInitialPreview, setHasSetInitialPreview] = useState(false);
  const { previewKor } = useKors();

  const { setPreviewKorId, selectedKor } = useKors();
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

  return (
    <>
      <Kor3DScene kor={previewKor} />
      <KorCarousel className='max-sm:hidden' />
    </>
  );
};

export default KorusPage;

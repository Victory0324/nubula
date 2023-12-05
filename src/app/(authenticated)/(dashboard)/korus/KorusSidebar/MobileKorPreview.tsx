import Image from 'next/image';
import ArrowBack from '../assets/ArrowBack';
import { useKors } from '@/app/providers/kors';
import BuySelectButton from './BuySelectButton';
import { useMobileTray } from '@/app/providers/mobileTray';
import { useMemo } from 'react';
import KorCarousel from '../KorCarousel';

const MobileKorPreview: React.FC = ({}) => {
  const { previewKor } = useKors();
  const { closeTray } = useMobileTray();

  const image = useMemo(() => {
    if (!previewKor || !previewKor.korImage) {
      return null;
    }

    return (
      <Image src={previewKor.korImage} alt='kor' width={400} height={400} />
    );
  }, [previewKor]);

  return (
    <div className='flex flex-col items-center justify-between h-full'>
      <div className='absolute left-3' onClick={closeTray}>
        <ArrowBack />
      </div>
      <div>{previewKor?.korName}</div>
      {previewKor?.korImage && <>{image}</>}
      <KorCarousel className='bottom-[120px]' />
      <BuySelectButton />
    </div>
  );
};

export default MobileKorPreview;

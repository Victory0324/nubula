import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useKors } from '@/app/providers/kors';
import Loading from '../assets/Loading';

const MyKors = ({
  onSave,
  onBack,
  setCroppedImage,
}: {
  onSave: (type: string) => void;
  onBack: () => void;
  setCroppedImage: (url: string) => void;
}) => {
  const [selectKor, setSelectKor] = useState<number>(-1);

  const { loading, availableKors } = useKors();
  const korPreviews = useMemo(() => {
    const processedKorImages: (string | undefined)[] = [];
    return availableKors.filter((kor) => {
      if (!kor.isLocked && !processedKorImages.includes(kor.korImage)) {
        processedKorImages.push(kor.korImage);
        return true;
      }
      return false;
    });
  }, [availableKors]);

  const handleImageClick = (index: number, image: string | undefined) => {
    setSelectKor(index);
    if (image != undefined) setCroppedImage(image);
  };

  return (
    <div>
      <div className='flex justify-start max-h-[176px] lg:max-h-[200px] mt-3 mb-3 lg:mt-7 lg:mb-7'>
        {loading ? (
          <Loading />
        ) : (
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-start mt-2 overflow-auto'>
              {korPreviews.map((kors, index) => (
                <div
                  key={index}
                  className={`m-1 w-[70px] h-[70px] lg:w-[85px] lg:h-[85px] cursor-pointer flex flex-row justify-center relative rounded-lg border border-[#fff]  ${
                    selectKor === index ? 'bg-[#9A6AFF]' : 'bg-[#101317]'
                  }`}
                  onClick={() => handleImageClick(index, kors.korImage)}
                >
                  {kors.korImage ? (
                    <Image
                      src={kors.korImage}
                      width={63}
                      height={63}
                      alt={`Kor ${index + 1}`}
                      className='w-63 h-61 object-contain rounded-md'
                    />
                  ) : (
                    <div>Image Not Available</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='flex justify-center mt-5 mb-2 lg:mt-10 lg:mb-2'>
          <button
            className='bg-gradient-to-l from-[#5F37B6] to-[#9A6AFF] text-white rounded-full h-[40px] w-[220px] lg:w-[274px] flex justify-center items-center'
            onClick={() => onSave('nft')}
          >
            Save
          </button>
        </div>
        <div>
          <button
            className='bg-[#9A6AFF1A] text-white border border-[#5F37B6] rounded-full h-[40px] w-[220px] lg:w-[274px]'
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyKors;

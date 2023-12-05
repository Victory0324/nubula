import React, { useCallback, useRef } from 'react';
import Image from 'next/image';

const FromDesktop = ({
  avatarUrl,
  handleFileChange,
  onBack,
}: {
  avatarUrl: string;
  handleFileChange: (e: any) => void;
  onBack: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadButtonClick = useCallback((): void => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, [fileInputRef]);

  return (
    <div>
      <div className='flex justify-center'>
        <div className='w-[150px] h-[150px] lg:w-[176px] lg:h-[176px] rounded-full border-2 border-opacity-25 border-white bg-lightgray flex items-center justify-center mt-7 mb-7 lg:mt-7 lg:mb-10'>
          <div className='w-[120px] h-[120px] rounded-full overflow-hidden'>
            <Image
              src={avatarUrl}
              width={120}
              height={120}
              alt='user profile image'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
      <div className='mb-2 '>
        <input
          type='file'
          ref={fileInputRef}
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
        <label htmlFor='file' className='w-full text-center'>
          <button
            className='bg-gradient-to-l from-[#5F37B6] to-[#9A6AFF] text-white rounded-full h-[40px] w-[220px] lg:w-[274px]'
            onClick={handleUploadButtonClick}
          >
            Upload from Device
          </button>
        </label>
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
  );
};

export default FromDesktop;

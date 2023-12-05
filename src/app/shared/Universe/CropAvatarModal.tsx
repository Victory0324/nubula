import React, { useState, useCallback } from 'react';
import UploadAvatar from './UploadAvatar';

const CropAvatarModal = ({
  avatarUrl,
  onSave,
  onClose,
  setCroppedImage,
  onBack,
}: {
  avatarUrl: string;
  onSave: (type: string) => void;
  onClose: () => void;
  setCroppedImage: (url: string) => void;
  onBack: () => void;
}) => {
  return (
    <div>
      <button
        onClick={onClose}
        className='text-white text-sm absolute top-0 right-0 m-2'
      >
        X
      </button>

      <p className='text-white text-xl lg:text-3xl mt-2 lg:mt-4 mb-6 font-bold'>
        Crop and Rotate
      </p>
      <UploadAvatar imgSrc={avatarUrl} onPreviewChange={setCroppedImage} />
      <div className='flex justify-center mt-5 mb-2'>
        <button
          className='bg-gradient-to-l from-[#5F37B6] to-[#9A6AFF] text-white rounded-full h-[40px] w-[220px] lg:w-[274px] flex justify-center items-center'
          onClick={() => onSave('device')}
        >
          Save
        </button>
      </div>
      <button
        className='bg-[#9A6AFF1A] text-white border border-[#5F37B6] rounded-full h-[40px] w-[220px] lg:w-[274px]'
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
};

export default CropAvatarModal;

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import SelectAvatarModal from './SelectAvatarModal';

const ProfileModal = ({
  avatarUrl,
  isChangingPicture,
  onChangePicture,
  onUpdateUserImage,
}: {
  avatarUrl: string;
  isChangingPicture: boolean;
  onChangePicture: () => void;
  onUpdateUserImage: (url: string) => void;
}) => {
  const [bShowSelectModal, setShowSelectModal] = useState(false);

  const closeProfileModal = useCallback(() => {
    setShowSelectModal((bShowSelectModal) => !bShowSelectModal);
    onChangePicture();
  }, [onChangePicture]);

  const goProfileModal = useCallback(() => {
    setShowSelectModal((bShowSelectModal) => !bShowSelectModal);
  }, []);

  return isChangingPicture ? (
    bShowSelectModal ? (
      <div className='bg-[#101317] bg-opacity-75 fixed inset-0 flex items-center justify-center z-50 space-y-28'>
        <div className='bg-[#101317] p-4 lg:p-6 rounded-lg shadow-md text-center relative max-w-[300px] lg:min-w-[490px] border border-purple-600 dark:border-purple-700 dark:bg-secondary-blue-black-black-0 dark:shadow-2xl'>
          <SelectAvatarModal
            avatarUrl={avatarUrl}
            onBack={goProfileModal}
            onClose={closeProfileModal}
            onUpdateUserImage={onUpdateUserImage}
          />
        </div>
      </div>
    ) : (
      <div className='bg-[#101317] bg-opacity-75 fixed inset-0 flex items-center justify-center z-50'>
        <div className='bg-[#101317] p-6 lg:p-8 rounded-lg shadow-md text-center relative border border-purple-600 dark:border-purple-700 dark:bg-secondary-blue-black-black-0 dark:shadow-2xl'>
          <button
            onClick={onChangePicture}
            className='text-white text-sm absolute top-0 right-0 m-2'
          >
            X
          </button>
          <p className='text-secondary-white text-center font-abc-favorit-extended font-bold text-2xl leading-tight tracking-tighter'>
            Profile Picture
          </p>
          <div className='text-gray-500 mb-4 mt-2'>
            <p className='text-sm'>Your profile picture allows you to</p>
            <p className='text-sm'>personalize your account and make it</p>
            <p className='text-sm'>feel more like yours</p>
          </div>
          <div className='flex justify-center'>
            <div className='rounded-full border-2 border-opacity-25 border-white bg-lightgray flex items-center justify-center mt-2 mb-5 lg:mt-5 lg:mb-10'>
              <div className='rounded-full overflow-hidden'>
                <Image
                  src={avatarUrl}
                  width={200}
                  height={200}
                  alt='user profile image'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
          <div>
            <div className='mb-2'>
              <button
                className='bg-gradient-to-l from-[#5F37B6] to-[#9A6AFF] text-white rounded-full h-[40px] w-[200px] lg:w-[274px]'
                onClick={() => {
                  setShowSelectModal((bShowSelectModal) => !bShowSelectModal);
                }}
              >
                Change
              </button>
            </div>
            <div>
              <button
                className='bg-[#9A6AFF1A] text-white border border-[#5F37B6] rounded-full h-[40px] w-[200px] lg:w-[274px]'
                onClick={onChangePicture}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <></>
  );
};

export default ProfileModal;

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useKors } from '@/app/providers/kors';
import Loading from '../assets/Loading';
import { useCurrentUser } from '@/app/providers/User';
import NoizeBalance from './NoizeBalance';
import ProfileModal from '../Universe/ProfileModal';
import Pencil from '../assets/Pencil';
import defaultAvatar from '../../../../public/images/default-avatar.png';

const MobileProfile = () => {
  const { selectedKor, loading } = useKors();
  const [isChangingPicture, setIsChangingPicture] = useState(false);
  const { user } = useCurrentUser();
  const [profilePic, setProfilePic] = useState<string>('');

  const handlePictureChange = useCallback(() => {
    setIsChangingPicture((isChangingPicture) => !isChangingPicture);
  }, []);

  const handleUpdateUserImage = useCallback((url: string) => {
    setProfilePic(url);
  }, []);

  useEffect(() => {
    setProfilePic(user?.avatarUrl ? user.avatarUrl : defaultAvatar.src);
  }, [user?.avatarUrl]);

  return (
    <>
      <div className='bg-black rounded-full py-1 px-1 border-white/25 border drop-shadow-md flex gap-1 items-center'>
        <div className='bg-black rounded-full  overflow-hidden p-2 border-white/25 border flex flex-col items-center justify-center'>
          {loading ? (
            <Loading />
          ) : (
            selectedKor?.korImage && (
              <Image
                src={profilePic}
                width={21}
                height={21}
                alt='User profile image'
                onClick={handlePictureChange}
              />
            )
          )}
        </div>
        <div className='mr-1'>
          <NoizeBalance />
        </div>
      </div>
      <ProfileModal
        isChangingPicture={isChangingPicture}
        avatarUrl={profilePic}
        onChangePicture={handlePictureChange}
        onUpdateUserImage={handleUpdateUserImage}
      />
    </>
  );
};

export default MobileProfile;

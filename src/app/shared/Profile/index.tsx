import Image from 'next/image';
import { useKors } from '@/app/providers/kors';
import { useCurrentUser } from '@/app/providers/User';
import Loading from '../assets/Loading';
import { useEffect, useState, useCallback } from 'react';
import Pencil from '../assets/Pencil';
import ProfileModal from '../Universe/ProfileModal';
import defaultAvatar from '../../../../public/images/default-avatar.png';

const Profile = () => {
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
      <div className='bg-black rounded-full h-[60px] w-[60px] overflow-hidden p-2 border-white/25 border drop-shadow-md flex flex-col items-center justify-center'>
        {loading ? (
          <Loading />
        ) : (
          selectedKor?.korImage && (
            <div className='group relative'>
              <Pencil className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block' />
              <Image
                src={profilePic}
                width={60}
                height={60}
                alt='user profile image'
                className='transition-opacity hover:cursor-pointer opacity-100 hover:opacity-25'
                onClick={handlePictureChange}
              />
            </div>
          )
        )}
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

export default Profile;

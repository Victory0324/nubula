import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Toggler from '@/app/(authenticated)/(dashboard)/nebula/NebulaSidebar/Toggler';
import { postUploadUserImage } from '@/utils/api/authenticated/elyxnir/userProfile/postUploadUserImage';
import CropAvatarModal from './CropAvatarModal';
import Toast from '../Toasts/Toast';
import MyKors from './MyKors';
import FromDesktop from './FromDesktop';
import { useCurrentUser } from '@/app/providers/User';
import { useAnalytics } from '@/app/providers/analytics';

const SelectAvatarModal = ({
  avatarUrl,
  onClose,
  onBack,
  onUpdateUserImage,
}: {
  avatarUrl: string;
  onClose: () => void;
  onBack: () => void;
  onUpdateUserImage: (url: string) => void;
}) => {
  const [uploadAvatarUrl, setUploadAvatarUrl] = useState('');
  const [uploadDesktop, setUploadDesktop] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string>('');

  const { user } = useCurrentUser();
  const { track } = useAnalytics();

  const [panel, setPanel] = useState("my kor's");

  const handleFileChange = useCallback((e: any) => {
    const file = e.target.files[0];
    let fileSrc = URL.createObjectURL(file);
    setUploadAvatarUrl(fileSrc);
    setUploadDesktop(true);
  }, []);

  const onSave = useCallback(
    async (type: string) => {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      try {
        Resizer.imageFileResizer(
          blob,
          128, // width
          128, // height
          'JPEG', // format
          100, // quality
          0, // rotation
          async (blob) => {
            const file = new File([blob as BlobPart], 'profile.jpg');
            const result = await postUploadUserImage(file);
            if (result.success) {
              track({
                category: 'profile',
                action: 'change_picture',
                image_type: type == 'nft' ? 'nft' : 'device',
                name: user ? user.userId : 'user',
              });
              onClose();
              onUpdateUserImage(result.data.image);
            } else {
              toast(<Toast type='error' title='Error' body={result.status} />);
            }
          },
          'blob'
        );
      } catch (e) {
        toast(<Toast type='error' title='Error' body='failed' />);
      }
    },
    [croppedImage, user, track, onClose, onUpdateUserImage]
  );

  return uploadDesktop ? (
    <CropAvatarModal
      avatarUrl={uploadAvatarUrl}
      onSave={onSave}
      setCroppedImage={setCroppedImage}
      onBack={() => setUploadDesktop(false)}
      onClose={onClose}
    />
  ) : (
    <div className='z-10'>
      <button
        onClick={onClose}
        className='text-white text-sm absolute top-0 right-0 m-2'
      >
        X
      </button>
      <p className='text-secondary-white text-center font-abc-favorit-extended font-bold text-2xl leading-tight tracking-tighter'>
        Profile Picture
      </p>
      <div className='bg-[#9A6AFF1A] mx-2 lg:mx-8 shadow rounded-full h-[32px] w-[358] mt-4 flex p-1 relative items-center'>
        <div className='w-full'>
          <Toggler
            items={["My Kor's", 'From Device']}
            selected={panel}
            onSelect={setPanel}
          />
        </div>
      </div>
      {panel === 'from device' ? (
        <FromDesktop
          avatarUrl={avatarUrl}
          handleFileChange={handleFileChange}
          onBack={onBack}
        />
      ) : (
        <MyKors
          onBack={onBack}
          onSave={onSave}
          setCroppedImage={setCroppedImage}
        />
      )}
    </div>
  );
};

export default SelectAvatarModal;

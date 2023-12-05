import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
const Avatar = dynamic(() => import('react-avatar-edit'), { ssr: false });

const UploadAvatar = ({
  imgSrc,
  onPreviewChange,
}: {
  imgSrc: string;
  onPreviewChange: (imageURLData: string) => void;
}) => {
  const [preview, setPreview] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [avatarSize, setAvatarSize] = useState(200);
  const [degree, setDegree] = useState<number>(0);

  const onBeforeFileLoad = useCallback(async () => {
    const Img = new Image();
    Img.src = imgSrc;
    Img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const max = Img.width > Img.height ? Img.width : Img.height;
      const rotatedWidth = max;
      const rotatedHeight = max;
      canvas.width = rotatedWidth;
      canvas.height = rotatedHeight;
      ctx!.translate(rotatedWidth / 2, rotatedHeight / 2);
      ctx!.rotate((degree * Math.PI) / 180);
      ctx!.drawImage(Img, -Img.width / 2, -Img.height / 2);
      const rotatedImage = canvas.toDataURL();
      setImage(rotatedImage);
      setAvatarSize((size) => size - 1);
    };
  }, [degree, imgSrc]);

  useEffect(() => {
    const handleResize = () => {
      const mobileSize = window.innerWidth <= 640 ? 130 : 200;
      setAvatarSize(mobileSize);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    onBeforeFileLoad();
  }, [degree, onBeforeFileLoad]);

  const onChangeDegree = useCallback(() => {
    let new_degree = (degree + 90) % 360;
    setDegree(new_degree);
  }, [degree]);

  const onClose = () => {
    setPreview('');
  };
  const onCrop = (view: string) => {
    setPreview(view);
    onPreviewChange(view);
  };

  return (
    <div className='w-full flex flex-col justify-center'>
      <div className='w-full flex justify-center relative'>
        {image && (
          <Avatar
            src={image}
            width={avatarSize}
            height={avatarSize}
            onCrop={onCrop}
            onClose={onClose}
            closeIconColor='transparent'
            label='Click to Upload Picture'
          />
        )}
      </div>
      <button onClick={onChangeDegree} className='text-white text-sm mt-5'>
        Rotate
      </button>
    </div>
  );
};

export default UploadAvatar;

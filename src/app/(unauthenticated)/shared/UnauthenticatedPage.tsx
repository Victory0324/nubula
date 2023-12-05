import Loading from '@/app/shared/assets/Loading';
import Logo from '../../../../public/homepage-logo.png';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import RotatingKor from '@/app/shared/KOR/3DScene/RotatingKor';
import Lighting from '@/app/shared/KOR/3DScene/Lighting';
import { Suspense } from 'react';

export default function UnauthenticatedPage({
  loading,
  children,
}: React.PropsWithChildren<{ loading?: boolean }>) {
  return (
    <>
      <main
        className={`
      flex
      min-h-screen
      p-4 md:p-24
      bg-[url(/images/background.png)]
      bg-cover
      `}
      >
        <div className='grow w-full flex flex-col items-center'>
          <Image src={Logo} className='w-[132px] mb-16' alt='Korus Logo' />
          {loading ? (
            <div className='mt-10'>
              <Loading className='text-white' />
            </div>
          ) : (
            children
          )}
        </div>
        <div className='max-md:hidden grow w-full'>
          <Suspense fallback={null}>
            <Canvas camera={{}}>
              <Lighting />
              <RotatingKor
                state={'idle'}
                slug={'kor_genesis'}
                eyeColor={'#9EFFFF'}
              />
            </Canvas>
          </Suspense>
        </div>
      </main>
    </>
  );
}

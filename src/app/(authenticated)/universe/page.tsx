'use client';
import Universe from '@/app/shared/Universe';

export default function UniversePage() {
  return (
    <div className='border-purple-9a lg:border h-full w-full transition-opacity duration-500 lg:pb-0 overflow-hidden bg-gray-10'>
      <Universe showProfile />
    </div>
  );
}

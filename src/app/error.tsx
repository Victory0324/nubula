'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='p-8  shadow-md rounded-md'>
        <h2 className='text-2xl font-semibold text-white mb-4'>
          Something went wrong!
        </h2>
        <button
          onClick={reset}
          className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200 transition-colors'
        >
          Please try again
        </button>
      </div>
    </div>
  );
}

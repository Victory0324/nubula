import { isDevOrPreview } from '@/utils/helpers/env';
import { useMemo } from 'react';

export default function Version() {
  const version = useMemo(
    () =>
      [
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
        process.env.NEXT_PUBLIC_VERCEL_ENV,
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
      ]
        .filter((s) => s)
        .join(' | '),
    []
  );

  if (!isDevOrPreview()) return null;

  return (
    <div className='fixed bottom-0 right-0 text-xs text-white/75 m-4'>
      {version}
    </div>
  );
}

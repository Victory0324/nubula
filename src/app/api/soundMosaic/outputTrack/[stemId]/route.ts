export const maxDuration = 300;

import { NextRequest } from 'next/server';
import { soundMosaicFetch } from '../../fetch';

export const GET = (
  request: NextRequest,
  {
    params,
  }: {
    request: NextRequest;
    params: { stemId: string };
  }
) => {
  const unlockIds = request.nextUrl.searchParams.get('unlockIds');
  const creator = request.nextUrl.searchParams.get('creator');

  return soundMosaicFetch(
    `outputTrack/${params.stemId}?unlockIds=${unlockIds}${
      creator ? `&creator=${creator}` : ''
    }`
  );
};

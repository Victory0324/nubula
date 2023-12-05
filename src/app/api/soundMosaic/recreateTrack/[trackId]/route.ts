export const maxDuration = 300;

import { NextRequest } from 'next/server';
import { soundMosaicFetch } from '../../fetch';

export const GET = (
  request: NextRequest,
  {
    params,
  }: {
    request: NextRequest;
    params: { trackId: string };
  }
) => {
  const changeAmount = request.nextUrl.searchParams.get('changeAmount');

  return soundMosaicFetch(
    `recreateTrack/${params.trackId}?changeAmount=${changeAmount}`
  );
};

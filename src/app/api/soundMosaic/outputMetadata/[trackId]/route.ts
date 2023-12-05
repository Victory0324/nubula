import { NextRequest } from 'next/server';
import { soundMosaicFetch } from '../../fetch';

export const GET = (
  request: NextRequest,
  { params }: { params: { trackId: string } }
) => {
  return soundMosaicFetch(`outputMetadata/${params.trackId}`);
};

export const dynamic = 'force-dynamic';

import { soundMosaicFetch } from '../fetch';

export async function GET() {
  return await soundMosaicFetch('inputStems', {
    cache: 'no-store',
  });
}

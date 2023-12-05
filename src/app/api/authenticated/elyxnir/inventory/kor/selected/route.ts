import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export function GET(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `item-inventory/api/kor/selected`,
  });
}

export async function PATCH(request: NextRequest) {
  const korUnlockId = request.nextUrl.searchParams.get('korUnlockId');
  const selectedIndex = request.nextUrl.searchParams.get('selectedIndex');

  const res = await elyxnirRequest({
    request,
    path: `item-inventory/api/kor/selected?korUnlockId=${korUnlockId}&selectedIndex=${selectedIndex}`,
  });

  return res;
}

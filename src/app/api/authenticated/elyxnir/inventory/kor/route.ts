export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../request';

export function GET(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `item-inventory/api/kor`,
  });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as KorPatchBody;

  const res = await elyxnirRequest({
    request,
    path: `item-inventory/api/kor?korUnlockId=${body.korUnlockId}`,
    body,
  });

  return res;
}

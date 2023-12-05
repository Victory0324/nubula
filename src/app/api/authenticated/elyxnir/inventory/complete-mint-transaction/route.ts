export const maxDuration = 300;

import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../request';
import { CompleteMintTransactionPostBody } from '@/utils/api/authenticated/elyxnir/inventory/completeMintTransaction';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as CompleteMintTransactionPostBody;

  const res = await elyxnirRequest({
    request,
    path: 'inventory/complete-mint-transaction',
    body,
    newApi: true,
  });

  return res;
}

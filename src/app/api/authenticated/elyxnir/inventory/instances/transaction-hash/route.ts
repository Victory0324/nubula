import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';
import { RecordMintTransactiontBody } from '@/utils/api/authenticated/elyxnir/inventory/recordMintTransaction';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RecordMintTransactiontBody;

  const res = await elyxnirRequest({
    request,
    path: 'inventory/record-mint-transaction',
    body,
    newApi: true,
  });

  return res;
}

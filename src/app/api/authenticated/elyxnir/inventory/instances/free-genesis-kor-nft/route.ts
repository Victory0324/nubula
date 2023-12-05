import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function GET(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `item-inventory/api/instances/free-genesis-kor-nft`,
  });
}

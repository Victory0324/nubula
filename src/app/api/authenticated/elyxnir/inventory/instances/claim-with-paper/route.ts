import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';
import { ClaimWithPaperPostBody } from '@/utils/api/authenticated/elyxnir/inventory/claimWithPaper';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ClaimWithPaperPostBody;

  return elyxnirRequest({
    request,
    path: `item-inventory/api/instances/claim-with-paper`,
    body,
  });
}

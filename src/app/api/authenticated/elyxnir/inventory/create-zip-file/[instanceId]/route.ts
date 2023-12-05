export const maxDuration = 300;

import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function POST(
  request: NextRequest,
  { params }: { params: { instanceId: string } }
) {
  const instanceId = params.instanceId;
  const res = await elyxnirRequest({
    request,
    path: `inventory/create-zip-file/${instanceId}`,
    newApi: true,
  });

  return res;
}

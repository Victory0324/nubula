import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function POST(request: NextRequest) {
  const { inputStem, patchData } = await request.json();

  return elyxnirRequest({
    request,
    path: 'inventory/instances',
    body: [{ ...inputStem, ...patchData }],
    newApi: true,
  });
}

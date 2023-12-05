import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../request';

export async function POST(request: NextRequest) {
  const body = await request.formData();
  return elyxnirRequest({
    request,
    path: `update-user-image`,
    newApi: true,
    formData: true,
    body,
  });
}

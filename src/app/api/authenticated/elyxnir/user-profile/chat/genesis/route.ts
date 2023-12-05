export const maxDuration = 300;

import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LynxPostBody;

  return elyxnirRequest({
    request,
    path: `/user-profile/api/user/chat/genesis`,
    body,
  });
}

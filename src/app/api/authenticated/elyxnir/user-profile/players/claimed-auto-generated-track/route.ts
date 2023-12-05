import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../../../request';

export async function PATCH(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `user-profile/api/players/claimed-auto-generated-track`,
  });
}

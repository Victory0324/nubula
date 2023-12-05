import { NextRequest } from 'next/server';
import { elyxnirRequest } from '../request';

export async function GET(request: NextRequest) {
  return elyxnirRequest({
    request,
    path: `user-profile/api/user`,
  });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Partial<User>;

  const res = elyxnirRequest({
    request,
    path: `user-profile/api/user`,
    body,
  });

  return res;
}

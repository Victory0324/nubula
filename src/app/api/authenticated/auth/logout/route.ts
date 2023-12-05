'use server';

import { cookies } from 'next/headers';

import { NextRequest } from 'next/server';
import { authenticatedRequest } from '../../authenticatedRequest';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken');

  await authenticatedRequest({
    request,
    url: `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}logout`,
    body: { refreshToken: refreshToken?.value },
  });

  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  cookies().delete('idToken');

  return redirect('/');
}

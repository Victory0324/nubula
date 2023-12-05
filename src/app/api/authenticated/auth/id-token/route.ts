'use server';

import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();

  const refreshToken = cookieStore.get('refreshToken');
  const idToken = cookieStore.get('idToken');

  if (!refreshToken)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ idToken: idToken?.value }, { status: 200 });
}

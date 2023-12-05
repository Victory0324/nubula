import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectUri = request.nextUrl.searchParams.get('redirectUri');
  const identityProvider = request.nextUrl.searchParams.get('identityProvider');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}oauth/start?redirectUri=${redirectUri}&identityProvider=${identityProvider}`
  );

  try {
    const url = await res.text();
    return NextResponse.json(
      { url },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return res;
  }
}

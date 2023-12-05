import handleLoginResponse from '@/utils/helpers/auth/handleLoginResponse';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}oauth/token-exchange`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  return handleLoginResponse(res);
}

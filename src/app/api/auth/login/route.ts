import handleLoginResponse from '@/utils/helpers/auth/handleLoginResponse';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginValues;
  const email = body.email || '';
  const password = body.password || '';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );

  return handleLoginResponse(res);
}

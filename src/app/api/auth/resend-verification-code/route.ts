export async function POST(request: Request) {
  const body = (await request.json()) as ForgotPasswordValues;

  return await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}resend-confirmation-code`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
}

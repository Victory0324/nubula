export async function PATCH(request: Request) {
  const body = await request.json();

  return await fetch(
    `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}confirm-forgot-password`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
}

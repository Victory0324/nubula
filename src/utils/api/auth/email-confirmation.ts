export async function verifyEmail(body: ConfirmSignupValues) {
  const res = await fetch(`api/auth/confirm-sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}

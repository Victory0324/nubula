export async function signUp(body: RegisterValues) {
  const res = await fetch(`api/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}

export async function login(body: LoginValues) {
  const res = await fetch(`api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}

import 'server-only';
import { cookies } from 'next/headers';

export async function getRefreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');
  const email = cookieStore.get('email');

  if (!refreshToken || !email) {
    return { success: false };
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL}refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken.value, email: email.value }),
      }
    );

    if (!res.ok) {
      return { success: false };
    }

    const refreshTokenInfo = await res.json();

    cookieStore.set({
      name: 'accessToken',
      value: refreshTokenInfo.accessToken,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: refreshTokenInfo.expiresIn,
    });

    cookieStore.set({
      name: 'idToken',
      value: refreshTokenInfo.idToken,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return { success: true, ...refreshTokenInfo };
  }
}

import 'server-only';
import { jwtDecode } from 'jwt-decode';

export default async function handleLoginResponse(res: Response) {
  if (!res.ok) {
    return res;
  }

  const json = await res.json();

  const { accessToken, refreshToken, expiresIn, userId, idToken } = json;

  const { email } = jwtDecode(idToken) as { email: string };

  return new Response(
    JSON.stringify({ success: true, userId: userId || email, idToken }),
    {
      status: res.status,
      headers: {
        'Access-Control-Expose-Headers': 'Set-Cookie',
        'Set-Cookie': `accessToken=${accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=${expiresIn}, refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict, idToken=${idToken}; HttpOnly; Secure; Path=/; SameSite=Strict, email=${email}; HttpOnly; Secure; Path=/; SameSite=Strict`,
      },
    }
  );
}

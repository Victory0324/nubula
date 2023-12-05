export type OAuthLoginValues = {
  code: string;
  redirectUri: string;
};

export async function oauthLogin(body: OAuthLoginValues) {
  const res = await fetch(`api/auth/oauth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res;
}

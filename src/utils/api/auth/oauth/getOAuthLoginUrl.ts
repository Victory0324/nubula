export type OauthLoginUrl = {
  provider: string;
  federationUrl: string;
};

export default async function getOAuthLoginUrl({
  redirectUri,
  identityProvider,
}: {
  redirectUri: string;
  identityProvider: string;
}): Promise<APIResponse<string>> {
  const res = await fetch(
    `api/auth/oauth/start?redirectUri=${redirectUri}&identityProvider=${identityProvider}`
  );

  if (!res.ok) {
    return { success: false, status: res.status };
  }

  const { url } = await res.json();
  return { success: true, data: url, status: res.status };
}

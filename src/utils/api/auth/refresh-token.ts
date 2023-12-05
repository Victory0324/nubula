export function refreshToken() {
  return fetch(`api/auth/refresh-token`, {
    method: 'GET',
  });
}

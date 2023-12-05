export async function getIdToken() {
  return await fetch(`api/authenticated/auth/id-token`, {
    method: 'GET',
  });
}

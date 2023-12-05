'use client';

export async function logout(): Promise<Response> {
  return await fetch(`api/authenticated/auth/logout`, {
    method: 'POST',
  });
}

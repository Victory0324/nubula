'use client';

export async function forgotPassword(body: ForgotPasswordValues) {
  return await fetch(`api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

'use client';

export async function confirmForgotPassword(body: ConfirmForgotPasswordValues) {
  return await fetch(`api/auth/confirm-forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

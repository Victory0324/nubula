export async function resendVerificationCode(body: ForgotPasswordValues) {
  return await fetch(`/api/auth/resend-verification-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

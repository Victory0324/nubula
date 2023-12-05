import { getRefreshToken } from '@/utils/helpers/auth/getRefreshToken';

export async function GET() {
  const { success } = await getRefreshToken();

  if (!success) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  } else {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  }
}

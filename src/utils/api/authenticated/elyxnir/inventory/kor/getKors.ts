import { elyxnirRequest } from '../../request';

export const preload = () => void getKors();

export async function getKors(): Promise<APIResponse<Kor[]>> {
  const res = await elyxnirRequest(`inventory/kor`, 'GET');

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to get kors', res);
      const { success, message } = await res.json();
      return { success, message, status };
    }

    const kors = await res.json();

    return { success: true, data: kors, status };
  } catch (e) {
    console.error(e);
    return { success: false, status };
  }
}

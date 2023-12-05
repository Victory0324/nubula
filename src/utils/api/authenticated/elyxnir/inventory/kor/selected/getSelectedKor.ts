import { KorIdentifier } from '@/app/providers/kors';
import { elyxnirRequest } from '../../../request';

export const preload = () => void getSelectedKor();

export default async function getSelectedKor(): Promise<
  APIResponse<KorIdentifier>
> {
  const res = await elyxnirRequest(`inventory/kor/selected`, 'GET');

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { success, message } = await res.json();
      return { success, message, status };
    }

    const data = await res.json();

    return { success: true, data, status };
  } catch (e) {
    console.error(e);
    return { success: false, status };
  }
}

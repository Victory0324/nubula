import { useCallback } from 'react';
import { elyxnirRequest } from '../request';

export const preload = () => void getUser();

export const getUser = async (): Promise<APIResponse<User>> => {
  const res = await elyxnirRequest(`user`, 'GET');
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
};

export function useGetUser() {
  return useCallback(() => getUser(), []);
}

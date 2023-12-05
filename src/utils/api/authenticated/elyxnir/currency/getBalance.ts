import { useCallback } from 'react';
import { elyxnirRequest } from '../request';

export const getBalance = async (
  currencyId: string
): Promise<APIResponse<CurrencyBalance>> => {
  const res = await elyxnirRequest(`currency/${currencyId}`, 'GET');
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

export function useGetBalance() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCallback((currencyId: string) => getBalance(currencyId), []);
}

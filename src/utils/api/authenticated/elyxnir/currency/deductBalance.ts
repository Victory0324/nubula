import { useCallback } from 'react';
import { elyxnirRequest } from '../request';

export const deductBalance = async ({
  currencyId,
  value,
}: CurrencyBalance): Promise<APIResponse<CurrencyBalance>> => {
  const res = await elyxnirRequest(`currency/${currencyId}`, 'PATCH', {
    value,
  });

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

export function useDeductBalance() {
  return useCallback((props: CurrencyBalance) => deductBalance(props), []);
}

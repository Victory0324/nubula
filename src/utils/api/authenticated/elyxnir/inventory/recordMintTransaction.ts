import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { useCallback } from 'react';
import { elyxnirRequest } from '../request';
import { useRequests } from '@/app/providers/requests';

export type RecordMintTransactiontBody = {
  transactionType: string;
  transactionHash: string;
  instanceId: string;
};

export const recordMintTransaction = async (
  body: RecordMintTransactiontBody
): Promise<APIResponse<undefined>> => {
  const res = await elyxnirRequest(
    `inventory/record-mint-transaction`,
    'POST',
    body
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false, status: res.status };
  }

  return { success: true, status: res.status };
};

export const useRecordMintTransaction = () => {
  const { setPendingTransactionHashRequests } = useRequests();

  return useAuthenticatedQuery(
    useCallback(
      async (body: RecordMintTransactiontBody) => {
        const response = await recordMintTransaction(body);

        if (!response.success) {
          setPendingTransactionHashRequests((prev) => [...prev, body]);
        }

        return response;
      },
      [setPendingTransactionHashRequests]
    )
  );
};

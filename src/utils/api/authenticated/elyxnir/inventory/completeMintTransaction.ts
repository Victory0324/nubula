import { elyxnirRequest } from '../request';

export type CompleteMintTransactionPostBody = {
  instanceId: string;
  token: number;
  contractAddress: string;
};

export const completeMintTransaction = async (
  body: CompleteMintTransactionPostBody
): Promise<APIResponse<undefined>> => {
  const res = await elyxnirRequest(
    `inventory/complete-mint-transaction`,
    'PATCH',
    body
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false, status: res.status };
  }

  return { success: true, status: res.status };
};

import { elyxnirRequest } from '../request';

export type ClaimWithPaperPostBody = {
  contractId: string;
  type: 'unlock' | 'ugc';
};

export type ClaimWithPaperResponseBody = {
  transactionId: `0x${string}`;
  checkoutId: string;
  contractId: string;
  status: string;
  hasPaymentError: boolean;
  isPaymentSubmitted: boolean;
  isPaymentReceived: boolean;
  isNFTDelivered: boolean;
  isFreeClaim: boolean;
};

export const claimWithPaper = async (
  body: ClaimWithPaperPostBody
): Promise<APIResponse<ClaimWithPaperResponseBody>> => {
  const res = await elyxnirRequest(
    `inventory/instances/claim-with-paper`,
    'POST',
    body
  );

  if (!res.ok) {
    console.error('Failed to POST claim with paper');
    return { success: false, status: res.status };
  }

  const data = await res.json();

  return { success: true, status: res.status, data };
};

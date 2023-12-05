export default async function getPaperTransactionStatus({
  transactionId,
}: {
  transactionId: string;
}): Promise<APIResponse<PaperTransactionStatus>> {
  try {
    const response = await fetch(
      `https://withpaper.com/api/v1/transaction-status/${transactionId}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      return { success: false, status: response.status };
    }

    const json = await response.json();

    return { success: true, status: response.status, data: json.result };
  } catch (e) {
    console.error(e);
    return { success: false, status: 500 };
  }
}

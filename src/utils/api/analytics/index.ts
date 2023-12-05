export const postEvent = async (body: AnalyticsPayload) => {
  return await fetch(`/api/analytics`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

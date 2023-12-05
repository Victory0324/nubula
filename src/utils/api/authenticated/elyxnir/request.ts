export const elyxnirRequest = async (
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: object
) => {
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(
    `/api/authenticated/elyxnir/${path}`,
    requestOptions
  );

  return response;
};

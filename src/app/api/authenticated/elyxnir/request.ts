import { NextRequest } from 'next/server';
import { authenticatedRequest } from '../authenticatedRequest';

export const elyxnirRequest = async ({
  request,
  path,
  body,
  newApi = false,
  formData = false,
}: {
  request: NextRequest;
  path: string;
  body?: object | FormData;
  newApi?: boolean;
  formData?: boolean;
}) => {
  return await authenticatedRequest({
    request,
    url: `${
      newApi
        ? process.env.NEXT_PUBLIC_ELYXNIR_NEW_API_URL
        : process.env.NEXT_PUBLIC_ELYXNIR_API_URL
    }${path}`,
    body,
    formData,
  });
};

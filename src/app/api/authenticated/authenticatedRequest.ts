import { cookies } from 'next/headers';

import { getRefreshToken } from '@/utils/helpers/auth/getRefreshToken';
import { NextRequest } from 'next/server';

const refreshAndRetry = async (url: string, requestOptions: RequestInit) => {
  const { success, accessToken } = await getRefreshToken();
  if (!success) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  } else {
    if (requestOptions.headers) {
      requestOptions.headers[
        'Authorization' as keyof HeadersInit
      ] = `Bearer ${accessToken}`;
    }

    return await fetch(url, requestOptions);
  }
};

export const authenticatedRequest = async ({
  request,
  url,
  body,
  formData = false,
}: {
  request: NextRequest;
  url: string;
  body?: object | FormData;
  formData?: boolean;
}) => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken && !accessToken) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  } else {
    const headers = {
      Authorization: `Bearer ${accessToken?.value}`,
    } as { Authorization: string; 'Content-Type'?: string };

    if (!formData) headers['Content-Type'] = 'application/json';

    const requestOptions: RequestInit = {
      method: request.method,
      headers,
    };

    if (body) {
      requestOptions.body = formData
        ? (body as FormData)
        : JSON.stringify(body);
    }

    if (refreshToken && !accessToken) {
      return refreshAndRetry(url, requestOptions);
    } else {
      const response = await fetch(url, requestOptions);

      if (response.status === 401) {
        return refreshAndRetry(url, requestOptions);
      } else {
        return response;
      }
    }
  }
};

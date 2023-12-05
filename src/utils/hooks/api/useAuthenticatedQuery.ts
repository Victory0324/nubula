import { useCurrentUser } from '@/app/providers/User';
import { useCallback } from 'react';

export default function useAuthenticatedQuery<T>(
  requestFn: T extends undefined
    ? () => Promise<any>
    : (arg0: T) => Promise<any>
) {
  const { logout } = useCurrentUser();

  const query = useCallback(
    async (args?: T extends undefined ? never : T) => {
      const response = await requestFn(args as any);

      const { status } = response;

      if (status === 401) {
        await logout();
        return {};
      } else return response;
    },
    [requestFn, logout]
  );

  return query;
}

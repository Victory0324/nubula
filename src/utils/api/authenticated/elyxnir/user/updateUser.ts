import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { useCallback } from 'react';
import { elyxnirRequest } from '../request';
import { useCurrentUser } from '@/app/providers/User';

export const updateUser = async (
  updates: Partial<User>
): Promise<{ success: boolean; message: string }> => {
  const res = await elyxnirRequest(`user`, 'PATCH', updates);

  if (!res.ok) {
    console.error('Failed to update user', res);
    const body = await res.json();
    return { success: false, message: body.message };
  }

  return { success: true, message: '' };
};

export function useUpdateUser() {
  const { user, setUser } = useCurrentUser();

  return useAuthenticatedQuery(
    useCallback(
      async (updates: Partial<User>) => {
        const userBeforeUpdate = user;
        setUser((user) => ({ ...user, ...updates }) as User);

        const res = await updateUser(updates);

        if (!res.success) {
          setUser(userBeforeUpdate);
        }

        return res;
      },
      [setUser, user]
    )
  );
}

import { elyxnirRequest } from '../request';

export const deleteInstance = async (instanceId: string) => {
  const res = await elyxnirRequest(
    `inventory/instances/${instanceId}`,
    'DELETE'
  );

  if (!res.ok) {
    console.error('Failed to delete instance');
    return { success: false };
  }

  return { success: true };
};

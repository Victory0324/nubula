import { elyxnirRequest } from '../request';

export async function getInstance(
  instanceId: string
): Promise<APIResponse<Instance>> {
  const res = await elyxnirRequest(`inventory/instances/${instanceId}`, 'GET');

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { message } = await res.json();
      return { success: false, message, status };
    }

    const instance = await res.json();

    return { success: true, data: instance, status };
  } catch (e) {
    return { success: false, status, message: (e as Error).message };
  }
}

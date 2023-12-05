import { elyxnirRequest } from '../request';

export async function getInventoryTemplate(
  id: Instance['templateId']
): Promise<APIResponse<TrackTemplate>> {
  const res = await elyxnirRequest(`inventory/templates/${id}`, 'GET');

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch template data for id', id);
      const { message } = await res.json();
      return { success: false, message, status };
    }

    const data = await res.json();

    return { success: true, data, status };
  } catch (e) {
    return { success: false, status, message: (e as Error).message };
  }
}

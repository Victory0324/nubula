import { elyxnirRequest } from '../request';

export const preload = (type: Instance['type']) =>
  void getInventoryInstances(type);

type InstanceType<T> = T extends 'Track'
  ? TrackInstance
  : T extends 'Stem'
  ? Instance
  : never;

export async function getInventoryInstances<T extends Instance['type']>(
  type: Instance['type']
): Promise<APIResponse<InstanceType<T>[]>> {
  const res = await elyxnirRequest(`inventory/instances?type=${type}`, 'GET');

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { message } = await res.json();
      return { success: false, message, status };
    }

    const instances = await res.json();

    return { success: true, data: instances, status };
  } catch (e) {
    console.error('getting instances', e);
    return { success: false, status, message: (e as Error).message };
  }
}

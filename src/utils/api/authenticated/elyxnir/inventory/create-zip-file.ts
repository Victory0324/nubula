import { elyxnirRequest } from '../request';

const createZipFile = async (
  instanceId: string
): Promise<APIResponse<Blob>> => {
  const res = await elyxnirRequest(
    `inventory/create-zip-file/${instanceId}`,
    'POST'
  );
  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { success, message } = await res.json();
      return { success, message, status };
    }

    const data = await res.blob();

    return { success: true, data, status };
  } catch (e) {
    console.error(e);
    return { success: false, status };
  }
};

export default createZipFile;

import { elyxnirRequest } from '../request';
import { PatchInstanceValues } from './patchInstance';

export const createStemInstance = async ({
  inputStem,
  patchData,
}: {
  inputStem: InputStem;
  patchData: Partial<PatchInstanceValues>;
}): Promise<{ success: boolean; instanceId?: string }> => {
  const res = await elyxnirRequest(`inventory/instances/stem`, 'POST', {
    inputStem,
    patchData,
  });

  if (!res.ok) {
    return { success: false };
  }

  const instanceIds = await res.json();
  return { success: true, instanceId: instanceIds[0] };
};

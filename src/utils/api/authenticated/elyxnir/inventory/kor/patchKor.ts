import { elyxnirRequest } from '../../request';

export const patchKor = async (props: KorPatchBody) => {
  const res = await elyxnirRequest('inventory/kor', 'PATCH', props);

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false };
  }

  return { success: true };
};

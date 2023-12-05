import { elyxnirRequest } from '../request';

export type PatchInstanceValues = {
  instanceId: string;
  title: string;
  isFavourite: boolean;
};

export const patchInstance = async (props: PatchInstanceValues) => {
  const res = await elyxnirRequest(
    `inventory/instances/${props.instanceId}`,
    'PATCH',
    props
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false };
  }

  return { success: true };
};

import { elyxnirRequest } from '../request';

export const postMultipleTracks = async (
  tracks: OutputTrack[]
): Promise<string[]> => {
  const res = await elyxnirRequest(`inventory/instances`, 'POST', tracks);

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return await res.json();
};

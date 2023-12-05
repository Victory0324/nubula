import { postMultipleTracks } from './postMultipleTracks';

export const postTrack = async (track: OutputTrack): Promise<string> => {
  const instanceIds = await postMultipleTracks([track]);
  return instanceIds[0];
};

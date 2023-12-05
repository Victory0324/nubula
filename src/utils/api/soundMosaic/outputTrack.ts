import { soundMosaicFetch } from './fetch';

interface OutputTrackRequest {
  stemId: string;
  unlockIds: string[] | null;
  creator: string | undefined;
}
export const preload = (props: OutputTrackRequest) =>
  void getOutputTrack(props);

export const getOutputTrack = async ({
  stemId,
  unlockIds,
  creator,
}: OutputTrackRequest): Promise<OutputTrack> => {
  const params = new URLSearchParams({
    ...(unlockIds?.length && {
      unlockIds: unlockIds?.join(','),
    }),
    ...(creator && {
      creator,
    }),
  });

  const res = await soundMosaicFetch(`/outputTrack/${stemId}?${params}`);

  if (!res.ok) {
    console.error(await res.text());
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

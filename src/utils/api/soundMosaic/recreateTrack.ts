import { soundMosaicFetch } from './fetch';

interface RecreateTrackRequest {
  trackid: string;
  changeAmount: number;
}

export const preload = (props: RecreateTrackRequest) =>
  void getRecreateTrack(props);

export const getRecreateTrack = async ({
  trackid,
  changeAmount,
}: RecreateTrackRequest): Promise<OutputTrack> => {
  const res = await soundMosaicFetch(
    `recreateTrack/${trackid}?changeAmount=${changeAmount}`
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return res.json();
};

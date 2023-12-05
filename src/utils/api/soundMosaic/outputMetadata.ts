import { soundMosaicFetch } from './fetch';

interface OutputMetadataRequest {
  trackid: string;
}
export const preload = (props: OutputMetadataRequest) =>
  void getOutputMetadata(props);

export const getOutputMetadata = async ({
  trackid,
}: OutputMetadataRequest): Promise<OutputTrack> => {
  const res = await soundMosaicFetch(`outputMetadata/${trackid}`);

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return res.json();
};

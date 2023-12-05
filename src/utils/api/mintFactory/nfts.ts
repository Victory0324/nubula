import { mintFactoryFetch } from './fetch';

export const preload = (args: GetMintsProps) => void getMints(args);

type GetMintsProps = {
  walletAddress: `0x${string}`;
  includeKorusInfo?: boolean;
  take?: number;
  skip?: number;
};

export const getMints = async ({
  walletAddress,
  includeKorusInfo = true,
  take = 100,
  skip = 0,
}: GetMintsProps): Promise<APIResponse<NftData>> => {
  const res = await mintFactoryFetch(
    `nfts?walletAddress=${walletAddress}${
      includeKorusInfo ? '&include=korus_info' : ''
    }&take=${take}&skip=${skip}`
  );

  if (!res.ok) {
    console.error('Failed to fetch data');
    return { success: false, status: res.status };
  }

  return { success: true, status: res.status, data: await res.json() };
};

export const getAllMints = async (walletAddress: `0x${string}`) => {
  const response = await getMints({ walletAddress });

  if (!response.success || !response.data) {
    return [];
  }

  let { data: fetchedMints, meta: fetchedMeta } = response.data;
  let mints = [...fetchedMints];

  while (mints.length < fetchedMeta.total) {
    const nextResponse = await getMints({
      walletAddress,
      skip: fetchedMeta.skip + fetchedMeta.take,
    });

    if (!nextResponse.success || !nextResponse.data) {
      break;
    }

    ({ data: fetchedMints, meta: fetchedMeta } = nextResponse.data);
    mints = [...mints, ...fetchedMints];
  }

  return mints;
};

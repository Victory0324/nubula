export const soundMosaicFetch = async (path: string) => {
  return await fetch(`/api/soundMosaic/${path}`, {
    cache: 'no-store',
  });
};

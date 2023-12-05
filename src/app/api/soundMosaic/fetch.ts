export const soundMosaicFetch = async (path: string, config?: RequestInit) => {
  return await fetch(`${process.env.SOUNDMOSAIC_API_URL}${path}`, {
    headers: {
      Authorization: `${process.env.SOUNDMOSAIC_API_KEY}`,
    },
    ...config,
  });
};

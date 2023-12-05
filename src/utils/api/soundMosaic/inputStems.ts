import { soundMosaicFetch } from './fetch';

export const preload = () => void getInputStems();

export const getInputStems = async (): Promise<InputStem[]> => {
  const res = await soundMosaicFetch('inputStems');

  if (!res.ok) {
    console.error('Failed to fetch data');
  }

  return res.json();
};

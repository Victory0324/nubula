import { isDevOrPreview } from './env';

export default function featureFlag(key: string) {
  if (isDevOrPreview()) return true;

  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || 'false');
  }
  return false;
}

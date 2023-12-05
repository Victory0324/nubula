import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { getKors } from '@/utils/api/authenticated/elyxnir/inventory/kor/getKors';

export default function useGetKors() {
  return useAuthenticatedQuery(useCallback(() => getKors(), []));
}

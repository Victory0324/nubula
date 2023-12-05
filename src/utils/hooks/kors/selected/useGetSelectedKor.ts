import getSelectedKor from '@/utils/api/authenticated/elyxnir/inventory/kor/selected/getSelectedKor';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../../api/useAuthenticatedQuery';

export default function useGetSelectedKor() {
  return useAuthenticatedQuery(useCallback(() => getSelectedKor(), []));
}

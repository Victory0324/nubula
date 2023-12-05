import { useCallback } from 'react';
import useAuthenticatedQuery from '../../api/useAuthenticatedQuery';
import patchSelectedKor from '@/utils/api/authenticated/elyxnir/inventory/kor/selected/patchSelectedKor';
import { KorIdentifier } from '@/app/providers/kors';

export default function usePatchSelectedKor() {
  return useAuthenticatedQuery(
    useCallback((props: KorIdentifier) => {
      return patchSelectedKor(props);
    }, [])
  );
}

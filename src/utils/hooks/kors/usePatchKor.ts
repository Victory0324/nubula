import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { patchKor } from '@/utils/api/authenticated/elyxnir/inventory/kor/patchKor';

export default function usePatchKor() {
  return useAuthenticatedQuery(
    useCallback((body: KorPatchBody) => patchKor(body), [])
  );
}

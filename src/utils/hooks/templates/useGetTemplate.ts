import { getTemplate } from '@/utils/api/elyxnir/templates/getTemplate';
import { useCallback } from 'react';
import useFetcher from '@/utils/hooks/useFetcher';

export default function useGetTemplate<T>({ id }: { id: string }) {
  const fetchTemplate = useCallback(() => {
    return getTemplate<T>({ templateId: id });
  }, [id]);

  return useFetcher(fetchTemplate);
}

import { useState, useEffect } from 'react';

export default function useFetcher<T>(fn: () => Promise<APIResponse<T>>) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { success, message, data } = await fn();

      if (!success) {
        setError(message);
      } else {
        setData(data);
      }

      setLoading(false);
    })();
  }, [fn]);

  return { data, loading, error };
}

import { useCallback, useState } from 'react';

export default function useValidate<T>(validateFn: (value: T) => void) {
  const [error, setError] = useState<string | null>(null);
  const validate = useCallback(
    (value: T) => {
      try {
        validateFn(value);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          throw err;
        }
      }
    },
    [validateFn]
  );

  return {
    validationError: error,
    validate,
  };
}

export function useValidateSpecialCharacters() {
  return useValidate((v: string) => {
    if (/[!@#$%^&*(),.?":{}|<>]/.test(v)) {
      throw new Error('Special charaters are not allowed');
    }
  });
}

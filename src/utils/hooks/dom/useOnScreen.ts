'use client';
import { useEffect, useMemo, useState, RefObject } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState<null | boolean>(null);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver != 'undefined') {
      return new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }
    return () => observer?.disconnect();
  }, [ref, observer]);

  return isIntersecting;
}

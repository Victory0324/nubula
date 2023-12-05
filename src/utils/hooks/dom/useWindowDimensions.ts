import { useState, useEffect, useCallback } from 'react';

export type WindowDimensions = {
  width: number;
  height: number;
};

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<
    WindowDimensions | undefined
  >();

  const getWindowDimensions = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }, []);

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getWindowDimensions]);

  return windowDimensions;
}

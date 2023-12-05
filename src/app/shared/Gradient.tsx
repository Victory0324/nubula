import { PropsWithChildren, useMemo } from 'react';

export default function Gradient({
  colors = [],
  children,
}: PropsWithChildren<{ colors: string[] | undefined }>) {
  const backgroundImage = useMemo(() => {
    if (colors) {
      return `linear-gradient(-45deg, ${colors.join()})`;
    }
    return '';
  }, [colors]);

  return (
    <div
      style={{
        backgroundImage,
      }}
      className='
      rounded-2xl
      flex flex-1 items-center justify-center gradient-animate'
    >
      {children}
    </div>
  );
}

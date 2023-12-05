import { useMemo } from 'react';

const ProgressBar = ({
  percentage,
  width,
}: {
  percentage: number;
  width: number;
}) => {
  const dots = useMemo(() => {
    if (!width) return [];

    const numDots = Math.floor(width / 6);

    const dots = Array.from({ length: numDots }).map((_, i) => {
      const active = i / numDots < percentage;
      return (
        <div
          key={i}
          className={`w-[4px] h-[8px] rounded-full  ${
            active ? 'drop-shadow-glow bg-purple-9a' : 'bg-white/50'
          }`}
        />
      );
    });
    return dots;
  }, [percentage, width]);

  return <div className='flex gap-[2px]'>{dots}</div>;
};

export default ProgressBar;

import type { SVGProps } from 'react';
const TickBoxEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect
      x={0.5}
      y={0.5}
      width={23}
      height={23}
      rx={3.5}
      stroke='currentColor'
      strokeOpacity={0.5}
    />
  </svg>
);
export default TickBoxEmpty;

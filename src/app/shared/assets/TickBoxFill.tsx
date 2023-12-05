import type { SVGProps } from 'react';
const TickBoxFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect width={24} height={24} rx={4} fill='currentColor' fillOpacity={0.1} />
    <path
      d='M6 13.8421L8.88 17L18 7'
      stroke='currentColor'
      strokeOpacity={0.9}
      strokeWidth={2}
    />
    <rect
      x={0.5}
      y={0.5}
      width={23}
      height={23}
      rx={3.5}
      stroke='currentColor'
      strokeOpacity={0.75}
    />
  </svg>
);
export default TickBoxFill;

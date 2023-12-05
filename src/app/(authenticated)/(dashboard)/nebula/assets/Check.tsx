import type { SVGProps } from 'react';
const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M6 13.8421L8.88 17L18 7'
      stroke='currentColor'
      strokeOpacity={0.9}
      strokeWidth={2}
    />
  </svg>
);
export default Check;

import { SVGProps } from 'react';

const Tick = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' {...props}>
    <path stroke='currentcolor' strokeWidth='2' d='m6 13.5 3 3L18.5 7' />
  </svg>
);

export default Tick;

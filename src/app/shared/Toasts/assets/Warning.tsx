import { SVGProps } from 'react';

const Warning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    {...props}
  >
    <path
      fill='currentcolor'
      fillRule='evenodd'
      d='M3 3h16v2H5v14h14v2H3V3Zm18 0h-2v18h2V3ZM11 15h2v2h-2v-2Zm2-8h-2v6h2V7Z'
      clipRule='evenodd'
    />
  </svg>
);

export default Warning;

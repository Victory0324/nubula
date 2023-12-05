import { SVGProps } from 'react';

const CoverArt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='63'
    height='63'
    fill='none'
    {...props}
  >
    <path fill='#4D4D4D' d='M.5.621h62v62H.5z' />
    <path
      fill='#999'
      fillRule='evenodd'
      d='M27.5 23.621h12v16h-8v-8h6v-4h-8v12h-8v-8h6v-8Zm0 10h-4v4h4v-4Zm10 0h-4v4h4v-4Z'
      clipRule='evenodd'
    />
  </svg>
);

export default CoverArt;

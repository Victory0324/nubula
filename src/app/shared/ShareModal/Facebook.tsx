import * as React from 'react';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M25 12a12 12 0 1 0-14 12v-8H8v-4h3V9c0-3 1-4 4-4h3v3h-2l-2 2v2h4l-1 4h-3v8c6-1 11-6 11-12Z'
    />
  </svg>
);
export default Facebook;

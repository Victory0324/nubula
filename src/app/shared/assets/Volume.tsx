import * as React from 'react';

const Volume = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentcolor'
      fillRule='evenodd'
      d='M11 2h2v20h-2v-2H9v-2h2V6H9V4h2V2ZM7 8V6h2v2H7Zm0 8H3V8h4v2H5v4h2v2Zm0 0v2h2v-2H7Zm10-6h-2v4h2v-4Zm2-2h2v8h-2V8Zm0 8v2h-4v-2h4Zm0-10v2h-4V6h4Z'
      clipRule='evenodd'
    />
  </svg>
);
export default Volume;

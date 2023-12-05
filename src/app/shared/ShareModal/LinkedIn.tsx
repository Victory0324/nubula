import * as React from 'react';

const LinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={25}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M23 0H2L1 2v20l1 2h21l2-2V2l-2-2ZM8 20H4V9h4v11ZM6 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm15 13h-4v-5l-1-3c-2 0-3 1-3 3v5h-3V9h3v2l4-2c3 0 4 2 4 5v6Z'
    />
  </svg>
);
export default LinkedIn;

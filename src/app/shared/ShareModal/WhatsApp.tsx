import * as React from 'react';
const WhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='m18 14-2-1h-1a16 16 0 0 1-1 1h-1l-3-3v-1h1V9l-1-2-1-1-2 1-1 2c0 2 1 3 2 3l4 5h4l2-1v-2Z'
    />
    <path
      fill='currentColor'
      d='M12 0A12 12 0 0 0 2 18l-2 6 7-2 5 1c7 0 12-5 12-11 0-7-5-12-12-12Zm0 21-5-2-3 1 1-3c-2-1-2-3-2-5C3 7 7 2 12 2s10 5 10 10-5 9-10 9Z'
    />
  </svg>
);
export default WhatsApp;

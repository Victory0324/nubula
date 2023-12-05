import type { SVGProps } from 'react';
const ScenzIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M18.75 5C20.0156 5 21 5.90625 21 7V17C21 18.125 19.9805 19 18.75 19H5.25C4.01953 19 3 18.125 3 17V7C3 5.90625 4.01953 5 5.25 5H18.75ZM19.3125 16.8125V7C19.3125 6.75 19.0664 6.5 18.75 6.5H5.25C4.96875 6.5 4.6875 6.75 4.6875 7L4.72266 17L7.35938 14.0625C7.5 13.9375 7.67578 13.8438 7.88672 13.8438C8.09766 13.8438 8.27344 13.9375 8.41406 14.0625L9.71484 15.5L13.4414 11C13.582 10.8438 13.7578 10.75 14.0039 10.75C14.2148 10.75 14.3906 10.8438 14.4961 11L19.3125 16.8125Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
    <path
      d='M11 10C11 8.91667 10.0833 8 9 8C7.875 8 7 8.91667 7 10C7 11.125 7.875 12 9 12C10.0833 12 11 11.125 11 10Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default ScenzIcon;

import type { SVGProps } from 'react';
const CopyLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M11 4H18C19.0938 4 20 4.90625 20 6V13C20 14.125 19.0938 15 18 15H11C9.875 15 9 14.125 9 13V6C9 4.90625 9.875 4 11 4ZM6 9H8V11H6V18H13V16H15V18C15 19.125 14.0938 20 13 20H6C4.875 20 4 19.125 4 18V11C4 9.90625 4.875 9 6 9Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default CopyLink;

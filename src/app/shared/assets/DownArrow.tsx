import type { SVGProps } from 'react';
const DownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M13.1522 14.7719C12.8043 15.076 12.1957 15.076 11.8478 14.7719L6.28261 10.2807C5.9058 10 5.9058 9.50877 6.28261 9.22807C6.63043 8.92398 7.23913 8.92398 7.58696 9.22807L12.5145 13.1813L17.413 9.22807C17.7609 8.92398 18.3696 8.92398 18.7174 9.22807C19.0942 9.50877 19.0942 10 18.7174 10.2807L13.1522 14.7719Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default DownArrow;

import { SVGProps } from 'react';

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentcolor'
      fillRule='evenodd'
      d='M15 2h2v2h4v18H3V4h4V2h2v2h6V2ZM9 6H5v2h14V6H9Zm-4 4v10h14V10H5Zm2 2h2v2H7v-2Zm6 0h-2v2h2v-2Zm2 0h2v2h-2v-2Zm-6 4H7v2h2v-2Zm2 0h2v2h-2v-2Zm6 0h-2v2h2v-2Z'
      clipRule='evenodd'
    />
  </svg>
);
export default CalendarIcon;

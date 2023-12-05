import type { SVGProps } from 'react';
const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M18.75 13.6875C19.9805 13.6875 21 14.707 21 15.9375V18.75C21 20.0156 19.9805 21 18.75 21H5.25C3.98438 21 3 20.0156 3 18.75V15.9375C3 14.707 3.98438 13.6875 5.25 13.6875H7.11328L8.80078 15.375H5.25C4.93359 15.375 4.6875 15.6562 4.6875 15.9375V18.75C4.6875 19.0664 4.93359 19.3125 5.25 19.3125H18.75C19.0312 19.3125 19.3125 19.0664 19.3125 18.75V15.9375C19.3125 15.6562 19.0312 15.375 18.75 15.375H15.1641L16.8516 13.6875H18.75ZM18.1875 17.3438C18.1875 17.8359 17.8008 18.1875 17.3438 18.1875C16.8516 18.1875 16.5 17.8359 16.5 17.3438C16.5 16.8867 16.8516 16.5 17.3438 16.5C17.8008 16.5 18.1875 16.8867 18.1875 17.3438ZM11.4023 15.9727L6.58594 11.1914C6.23438 10.875 6.23438 10.3477 6.58594 9.99609C6.90234 9.67969 7.42969 9.67969 7.78125 9.99609L11.1562 13.3711V3.84375C11.1562 3.38672 11.5078 3 12 3C12.457 3 12.8438 3.38672 12.8438 3.84375V13.3711L16.1836 10.0312C16.5 9.67969 17.0273 9.67969 17.3438 10.0312C17.6953 10.3477 17.6953 10.875 17.3438 11.1914L12.5625 15.9727C12.4219 16.1484 12.2109 16.2188 12 16.2188C11.7539 16.2188 11.543 16.1484 11.4023 15.9727Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default DownloadIcon;
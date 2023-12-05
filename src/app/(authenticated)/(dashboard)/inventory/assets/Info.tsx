import type { SVGProps } from 'react';
const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12 3.25C16.957 3.25 21 7.29297 21 12.25C21 17.2422 16.957 21.25 12 21.25C7.00781 21.25 3 17.2422 3 12.25C3 7.29297 7.00781 3.25 12 3.25ZM12 19.5625C16.0078 19.5625 19.3125 16.293 19.3125 12.25C19.3125 8.24219 16.0078 4.9375 12 4.9375C7.95703 4.9375 4.6875 8.24219 4.6875 12.25C4.6875 16.293 7.95703 19.5625 12 19.5625ZM13.4062 15.0625C13.8633 15.0625 14.25 15.4492 14.25 15.9062C14.25 16.3984 13.8633 16.75 13.4062 16.75H10.5938C10.1016 16.75 9.75 16.3984 9.75 15.9062C9.75 15.4492 10.1016 15.0625 10.5938 15.0625H11.1562V12.8125H10.875C10.3828 12.8125 10.0312 12.4609 10.0312 11.9688C10.0312 11.5117 10.3828 11.125 10.875 11.125H12C12.457 11.125 12.8438 11.5117 12.8438 11.9688V15.0625H13.4062ZM12 10C11.3672 10 10.875 9.50781 10.875 8.875C10.875 8.27734 11.3672 7.75 12 7.75C12.5977 7.75 13.125 8.27734 13.125 8.875C13.125 9.50781 12.5977 10 12 10Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default Info;
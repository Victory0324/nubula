import type { SVGProps } from 'react';
const HeartOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M11.5781 5.50511L11.9648 5.94435L12.3867 5.54172C13.5469 4.33381 15.1992 3.78476 16.7812 4.07759C19.207 4.48022 21 6.67642 21 9.23864V9.42166C21 10.959 20.3672 12.4231 19.3125 13.448L12.9492 19.634C12.7031 19.8902 12.3516 20 12 20C11.6133 20 11.2617 19.8902 11.0156 19.634L4.65234 13.448C3.59766 12.4231 3 10.959 3 9.42166V9.23864C3 6.67642 4.75781 4.48022 7.18359 4.07759C8.76562 3.78476 10.418 4.33381 11.5781 5.50511C11.5781 5.54172 11.543 5.50511 11.5781 5.50511ZM11.9648 8.43337L10.3828 6.74962C9.60937 5.98096 8.51953 5.61492 7.46484 5.79794C5.84766 6.09076 4.6875 7.51829 4.6875 9.23864V9.42166C4.6875 10.4832 5.07422 11.4714 5.8125 12.1669L12 18.1698L18.1523 12.1669C18.8906 11.4714 19.3125 10.4832 19.3125 9.42166V9.23864C19.3125 7.51829 18.1172 6.09076 16.5 5.79794C15.4453 5.61492 14.3555 5.98096 13.582 6.74962L11.9648 8.43337Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default HeartOutline;
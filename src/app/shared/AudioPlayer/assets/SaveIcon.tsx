import type { SVGProps } from 'react';
const SaveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M17.25 3C18.1979 3 19 3.77312 19 4.68681V19.8681C19 20.7466 18.0156 21.2738 17.2135 20.8521L12 17.9002L6.75 20.8521C5.94792 21.2738 5 20.7466 5 19.8681V4.68681C5 3.77312 5.76562 3 6.75 3H17.25ZM17.25 18.8841V4.89766C17.25 4.79224 17.1406 4.68681 16.9948 4.68681H6.93229C6.82292 4.68681 6.75 4.79224 6.75 4.89766V18.8841L12 15.9322L17.25 18.8841Z'
      fill='currentColor'
    />
  </svg>
);
export default SaveIcon;

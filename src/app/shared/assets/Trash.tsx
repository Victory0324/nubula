import type { SVGProps } from 'react';
const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M9.52009 3.63281C9.6875 3.24609 10.0558 3 10.4576 3H14.5089C14.9107 3 15.279 3.24609 15.4464 3.63281L15.7143 4.125H18.9286C19.4978 4.125 20 4.65234 20 5.25C20 5.88281 19.4978 6.375 18.9286 6.375H6.07143C5.46875 6.375 5 5.88281 5 5.25C5 4.65234 5.46875 4.125 6.07143 4.125H9.28571L9.52009 3.63281ZM18.9286 7.5L18.192 19.418C18.1585 20.332 17.4554 21 16.5848 21H8.3817C7.51116 21 6.80804 20.332 6.77455 19.418L6.07143 7.5H18.9286Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default Trash;

import { SVGProps } from 'react';

export default function Cursor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 34' {...props}>
      <path
        fill='currentcolor'
        d='M7.083 1.417h2.833V29.75H7.083zM9.917 26.917h2.833v2.833H9.917zM7.083 29.75h2.833v2.833H7.083zM12.75 24.083h2.833v2.833H12.75zM15.583 21.25h2.833v2.833h-2.833zM21.25 21.25h5.667v2.833H21.25zM18.417 21.25h2.833v2.833h-2.833zM21.25 15.583h2.833v2.833H21.25zM24.083 18.417h2.833v2.833h-2.833zM26.917 21.25h2.833v2.833h-2.833zM18.417 12.75h2.833v2.833h-2.833zM15.583 9.917h2.833v2.833h-2.833zM12.75 7.083h2.833v2.833H12.75zM9.917 4.25h2.833v2.833H9.917z'
      />
    </svg>
  );
}

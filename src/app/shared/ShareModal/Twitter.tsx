import * as React from 'react';
const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='m2 2 8 10-8 8h2l7-7 5 7h6l-8-10 7-8h-2l-6 7-5-7H2Zm3 2h3l11 15h-2L5 4Z'
    />
  </svg>
);
export default Twitter;

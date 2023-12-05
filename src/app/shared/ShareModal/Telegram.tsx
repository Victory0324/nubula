import * as React from 'react';

const Telegram = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={25}
      height={24}
      viewBox='0 0 24 25'
      fill='none'
      {...props}
    >
      <path
        fill='currentColor'
        d='M24.047.33c-.41-.382-1.053-.436-1.718-.143-.7.309-19.794 9.311-20.57 9.679-.142.054-1.377.56-1.25 1.688.114 1.017 1.106 1.438 1.227 1.487l4.854 1.827c.323 1.178 1.51 5.526 1.772 6.455.164.579.431 1.34.899 1.496.41.174.819.015 1.083-.213l2.968-3.026 4.79 4.107.115.075c.325.159.637.238.934.238.23 0 .45-.047.661-.142.718-.324 1.005-1.076 1.035-1.161L24.426 2.25c.218-1.092-.085-1.648-.38-1.921ZM10.872 15.599l-1.638 4.8-1.638-6 12.555-10.2-9.28 11.4Z'
      />
    </svg>
  );
};

export default Telegram;

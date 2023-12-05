import * as React from 'react';

const PauseEmpty = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.6667 14.6667H15.8333V33.3334H21.6667V14.6667ZM32.1667 14.6667H26.3333V33.3334H32.1667V14.6667Z'
        fill='white'
      />
    </svg>
  );
};

export default PauseEmpty;

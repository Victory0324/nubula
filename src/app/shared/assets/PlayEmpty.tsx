import * as React from 'react';

const PlayEmpty = (props: React.SVGProps<SVGSVGElement>) => {
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
        d='M17.6768 13.677C17.5023 13.5753 17.297 13.515 17.0834 13.5024C16.8698 13.4899 16.6561 13.5257 16.4657 13.606C16.2753 13.6862 16.1156 13.8078 16.0041 13.9574C15.8925 14.107 15.8335 14.2788 15.8333 14.454V33.546C15.8335 33.7212 15.8925 33.893 16.0041 34.0426C16.1156 34.1922 16.2753 34.3138 16.4657 34.394C16.6561 34.4742 16.8698 34.5101 17.0834 34.4976C17.297 34.485 17.5023 34.4247 17.6768 34.323L34.011 24.777C34.1622 24.6887 34.2855 24.5722 34.3706 24.437C34.4556 24.3018 34.5 24.152 34.5 24C34.5 23.848 34.4556 23.6982 34.3706 23.563C34.2855 23.4278 34.1622 23.3113 34.011 23.223L17.6768 13.677Z'
        fill='white'
      />
    </svg>
  );
};

export default PlayEmpty;

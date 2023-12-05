import type { SVGProps } from 'react';
const Zap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M15.7839 3.03516C16.4271 3.03516 16.901 3.66797 16.7318 4.30078L14.9036 10.875H17.8151C18.4583 10.875 19 11.4375 19 12.1055C19 12.4922 18.8307 12.8086 18.5599 13.0547L9.79167 20.7891C9.6224 20.9297 9.41927 21 9.18229 21C8.53906 21 8.0651 20.3672 8.23438 19.7344L10.0625 13.125H7.11719C6.50781 13.125 6 12.5977 6 11.9648C6 11.6133 6.13542 11.2617 6.3724 11.0508L15.1745 3.24609C15.3438 3.10547 15.5469 3 15.7839 3V3.03516ZM14.5651 5.98828L8.4375 11.4375H11.1458C11.3828 11.4375 11.6198 11.5781 11.7891 11.7891C11.9245 12 11.9922 12.2812 11.9245 12.5273L10.401 18.0469L16.5964 12.5625H13.8542C13.5833 12.5625 13.3464 12.457 13.1771 12.2461C13.0417 12.0352 12.974 11.7539 13.0417 11.5078L14.5651 5.98828Z'
      fill='currentColor'
      fillOpacity={0.9}
    />
  </svg>
);
export default Zap;
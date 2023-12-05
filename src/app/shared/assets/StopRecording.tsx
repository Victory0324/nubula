import type { SVGProps } from 'react';
const StopRecording = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={16}
    viewBox='0 0 17 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16ZM6.27778 4.88889C5.78686 4.88889 5.38889 5.28686 5.38889 5.77778V10.2222C5.38889 10.7131 5.78686 11.1111 6.27778 11.1111H10.7222C11.2131 11.1111 11.6111 10.7131 11.6111 10.2222V5.77778C11.6111 5.28686 11.2131 4.88889 10.7222 4.88889H6.27778Z'
      fill='currentColor'
    />
  </svg>
);
export default StopRecording;

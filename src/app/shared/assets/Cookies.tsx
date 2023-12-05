import { SVGProps } from 'react';

const CookiesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='56'
    height='64'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <mask id='a' fill='#fff'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M55.154 20.51a16.435 16.435 0 0 1-5.157.823c-8.836 0-15.999-6.946-15.999-15.515 0-1.75.299-3.431.849-5A28.889 28.889 0 0 0 27.999 0C12.536 0 0 12.156 0 27.151c0 14.996 12.536 27.152 28 27.152 15.463 0 27.998-12.156 27.998-27.151 0-2.292-.292-4.517-.843-6.643Z'
      />
    </mask>
    <path
      d='m55.154 20.51.968-.252-.267-1.033-1.014.335.313.95ZM34.847.817l.944.331.365-1.041-1.072-.262-.237.972ZM54.841 19.56c-1.518.5-3.147.773-4.843.773v2c1.911 0 3.752-.307 5.47-.874l-.627-1.9Zm-4.843.773c-8.314 0-15-6.527-15-14.515h-2c0 9.15 7.64 16.515 17 16.515v-2Zm-15-14.515c0-1.635.279-3.205.793-4.669L33.903.487a16.069 16.069 0 0 0-.905 5.33h2ZM27.999 1c2.282 0 4.497.274 6.611.79l.474-1.944A29.888 29.888 0 0 0 27.999-1v2ZM1 27.151C1 12.737 13.059 1 28 1v-2C12.012-1-1 11.575-1 27.151h2Zm27 26.152c-14.941 0-27-11.737-27-26.151h-2c0 15.576 13.013 28.151 29 28.151v-2Zm26.998-26.151c0 14.414-12.058 26.151-26.999 26.151v2c15.987 0 29-12.575 29-28.151h-2Zm-.811-6.392c.53 2.045.811 4.186.811 6.391h2c0-2.376-.303-4.686-.876-6.892l-1.935.502Z'
      fill='currentColor'
      mask='url(#a)'
    />
    <path
      d='M43.056 31c0 1.364-1.152 2.5-2.612 2.5-1.459 0-2.61-1.136-2.61-2.5s1.151-2.5 2.61-2.5c1.46 0 2.611 1.136 2.611 2.5ZM34.76 38c0 1.364-1.152 2.5-2.612 2.5-1.46 0-2.611-1.136-2.611-2.5s1.152-2.5 2.611-2.5c1.46 0 2.611 1.136 2.611 2.5ZM55.5 61c0 1.364-1.152 2.5-2.611 2.5-1.46 0-2.611-1.136-2.611-2.5s1.151-2.5 2.61-2.5c1.46 0 2.612 1.136 2.612 2.5Z'
      stroke='#fff'
    />
  </svg>
);
export default CookiesIcon;
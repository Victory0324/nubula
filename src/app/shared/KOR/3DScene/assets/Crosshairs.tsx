import { SVGProps } from 'react';

export default function Crosshairs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentcolor'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13 2.07324V6.07324H18V11.0732H22V13.0732H18V18.0732H13V22.0732H11V18.0732H6V13.0732H2V11.0732H6V6.07324H11V2.07324H13ZM8 8.07324V16.0732H16V8.07324H8ZM10 10.0732H14V14.0732H10V10.0732Z'
        fill='currentcolor'
      />
    </svg>
  );
}

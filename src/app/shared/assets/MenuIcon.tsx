import { SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='58' height='48' fill='none' {...props}>
    <g fill='currentColor' filter='url(#a)'>
      <path d='M16.334 14.249h25.333v2.375H16.334zM16.334 21.375h25.333v2.375H16.334z' />
    </g>
    <defs>
      <filter
        id='a'
        width='88'
        height='88'
        x='-15'
        y='-25'
        filterUnits='userSpaceOnUse'
      >
        <feFlood result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='12.5' />
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur_880_298858'
        />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy='8' />
        <feGaussianBlur stdDeviation='8' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0' />
        <feBlend
          in2='effect1_backgroundBlur_880_298858'
          result='effect2_dropShadow_880_298858'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect2_dropShadow_880_298858'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

export default MenuIcon;

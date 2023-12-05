import { SVGProps } from 'react';

export default function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width='24' height='24' fill='none' {...props}>
      <path
        fill='#999'
        d='M15 2H9v2H7v4H4v14h16V8h-3V4h-2V2Zm0 2v4H9V4h6Zm-6 6h9v10H6V10h3Zm4 3h-2v4h2v-4Z'
      />
    </svg>
  );
}

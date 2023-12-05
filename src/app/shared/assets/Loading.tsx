import { SVGProps } from 'react';

export default function Loading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      fill='currentcolor'
      {...props}
      className={`animate-spin text-gray-24 ${props.className}`}
    >
      <path
        fill='currentcolor'
        fillOpacity='.1'
        d='M12.816 2.471v4.05c0 .44-.366.797-.816.797a.806.806 0 0 1-.816-.797v-4.05c0-.44.366-.797.816-.797.45 0 .816.357.816.797Z'
      />
      <path
        fill='currentcolor'
        d='M6.694 12.53c0 .441-.366.797-.816.797H1.753a.806.806 0 0 1-.815-.796c0-.441.365-.797.815-.797h4.125c.45 0 .816.356.816.796Zm6.122 6.01v4.05c0 .44-.366.797-.816.797a.806.806 0 0 1-.816-.797v-4.05c0-.44.366-.797.816-.797.45 0 .816.356.816.797Zm-5.42-8.616a.822.822 0 0 1-1.105.3L2.719 8.19c-.385-.225-.525-.713-.3-1.088a.81.81 0 0 1 1.106-.29l3.572 2.025a.776.776 0 0 1 .3 1.087Zm14.185 8.044a.834.834 0 0 1-.703.403.77.77 0 0 1-.403-.112l-3.572-2.025a.792.792 0 0 1-.3-1.088.82.82 0 0 1 1.116-.29l3.572 2.025a.787.787 0 0 1 .29 1.087Zm-11.944.169-2.062 3.506a.834.834 0 0 1-.703.403.828.828 0 0 1-.413-.112c-.384-.225-.525-.713-.3-1.088l2.063-3.506a.82.82 0 0 1 1.116-.29.782.782 0 0 1 .3 1.087Zm7.894 3.797a.783.783 0 0 1-.403.103.802.802 0 0 1-.703-.403l-2.063-3.507a.782.782 0 0 1 .3-1.087.83.83 0 0 1 1.116.29l2.063 3.507a.817.817 0 0 1-.31 1.097Zm-10.425-5.71L3.525 18.25a.807.807 0 0 1-.403.103.802.802 0 0 1-.703-.403.782.782 0 0 1 .3-1.087l3.572-2.025a.83.83 0 0 1 1.115.29.798.798 0 0 1-.3 1.097Z'
      />
      <path
        fill='currentcolor'
        d='M6.694 12.53c0 .441-.366.798-.816.798H1.753a.806.806 0 0 1-.815-.797c0-.44.365-.797.815-.797h4.125c.45 0 .816.356.816.797Zm6.122 6.01v4.05c0 .44-.366.797-.816.797a.806.806 0 0 1-.816-.797v-4.05c0-.44.366-.797.816-.797.45 0 .816.357.816.797Zm-5.42-8.616a.822.822 0 0 1-1.105.3L2.719 8.19c-.385-.225-.525-.712-.3-1.087a.81.81 0 0 1 1.106-.291l3.572 2.025a.776.776 0 0 1 .3 1.087Zm14.185 8.044a.834.834 0 0 1-.703.403.77.77 0 0 1-.403-.112l-3.572-2.025a.792.792 0 0 1-.3-1.088.82.82 0 0 1 1.116-.29l3.572 2.025a.787.787 0 0 1 .29 1.087Zm-11.944.169-2.062 3.506a.834.834 0 0 1-.703.403.828.828 0 0 1-.413-.112c-.384-.225-.525-.713-.3-1.088l2.063-3.506a.82.82 0 0 1 1.116-.29.782.782 0 0 1 .3 1.087Zm7.894 3.797a.783.783 0 0 1-.403.103.802.802 0 0 1-.703-.403l-2.063-3.506a.782.782 0 0 1 .3-1.088.83.83 0 0 1 1.116.29l2.063 3.507a.817.817 0 0 1-.31 1.097Zm-10.425-5.71L3.525 18.25a.807.807 0 0 1-.403.103.802.802 0 0 1-.703-.404.782.782 0 0 1 .3-1.087l3.572-2.025a.83.83 0 0 1 1.115.29.798.798 0 0 1-.3 1.097Z'
      />
      <path
        fill='currentcolor'
        fillOpacity='.25'
        d='M17.831 4.224 15.77 7.731a.834.834 0 0 1-.703.403.859.859 0 0 1-.404-.103.802.802 0 0 1-.3-1.097l2.063-3.507a.82.82 0 0 1 1.116-.29.787.787 0 0 1 .29 1.087Z'
      />
      <path
        fill='currentcolor'
        fillOpacity='.5'
        d='M17.709 10.224 21.281 8.2a.795.795 0 0 0 .3-1.097c-.216-.375-.722-.506-1.106-.29l-3.572 2.015a.794.794 0 0 0-.3 1.097c.15.263.422.403.703.403a.807.807 0 0 0 .403-.103Z'
      />
      <path
        fill='currentcolor'
        fillOpacity='.75'
        d='M22.247 13.328c.45 0 .815-.356.815-.797a.806.806 0 0 0-.816-.797h-4.124a.806.806 0 0 0-.816.797c0 .44.366.797.816.797h4.125Z'
      />
    </svg>
  );
}

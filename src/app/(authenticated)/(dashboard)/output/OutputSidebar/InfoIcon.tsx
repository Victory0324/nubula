import { SVGProps } from 'react';

const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <circle cx='12' cy='12' r='9' fill='white' fillOpacity='0.1' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.4443 3.6853C8.08879 2.58649 10.0222 2 12 2C14.6513 2.0028 17.1932 3.05727 19.068 4.93202C20.9427 6.80678 21.9972 9.34869 22 12C22 13.9778 21.4135 15.9112 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8078C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17316C3.51808 6.3459 4.79981 4.78412 6.4443 3.6853ZM7.29902 19.0355C8.69052 19.9653 10.3265 20.4615 12 20.4615C14.2434 20.459 16.3941 19.5667 17.9804 17.9804C19.5667 16.3941 20.459 14.2434 20.4615 12C20.4615 10.3265 19.9653 8.69051 19.0355 7.29902C18.1057 5.90753 16.7842 4.82299 15.2381 4.18256C13.6919 3.54212 11.9906 3.37456 10.3492 3.70105C8.70786 4.02754 7.20016 4.83342 6.01679 6.01679C4.83342 7.20015 4.02754 8.70786 3.70105 10.3492C3.37456 11.9906 3.54213 13.6919 4.18256 15.2381C4.82299 16.7842 5.90753 18.1057 7.29902 19.0355ZM11 17L13 17L13 11L11 11L11 17ZM11 9.00002L13 9.00002L13 7.00002L11 7.00002L11 9.00002Z'
        fill='white'
      />
    </svg>
  );
};

export default InfoIcon;

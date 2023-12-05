import { PropsWithChildren } from 'react';

interface MenuItemProps extends PropsWithChildren {
  className?: string;
  icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ className, ...props }) => (
  <div
    className={`
      h-[40px]

      w-full rounded-xl px-4 py-2 bg-gray-18
      text-gray-999
      hover:text-white

      text-sm
      font-light text-left

      transition-colors
      flex items-center

      ${className}
    `}
    {...props}
  >
    {props.icon && (
      <div className='mr-3 flex items-center justify-center w-[24px] h-[24px]'>
        {props.icon}
      </div>
    )}
    {props.children}
  </div>
);

export default MenuItem;

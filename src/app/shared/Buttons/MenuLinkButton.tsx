interface MenuLinkButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  icon?: React.ReactNode;
}

const MenuLinkButton: React.FC<MenuLinkButtonProps> = ({
  className,
  ...props
}) => (
  <button
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
      disabled:cursor-not-allowed
    `}
    {...props}
  >
    {props.icon && (
      <div className='mr-3 flex items-center justify-center w-[24px] h-[24px]'>
        {props.icon}
      </div>
    )}
    {props.children}
  </button>
);

export default MenuLinkButton;

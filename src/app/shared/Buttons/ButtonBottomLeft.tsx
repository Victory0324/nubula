interface ButtonBottomLeftProps
  extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  onlyOutline?: boolean;
}

const ButtonBottomLeft: React.FC<ButtonBottomLeftProps> = ({
  className,
  onlyOutline,
  ...props
}) => (
  <button
    className={`
      font-bold

      ${onlyOutline ? 'text-white' : 'text-black'}
      ${onlyOutline ? 'bg-gray-13' : 'bg-white'}
      border
      border-white

      px-8

      rounded-tr-xl
      rounded-tl-3xl

      rounded-br-xl

      h-[35px]

      disabled:opacity-50

      transition-opacity
      hover:opacity-70

      ${className}
    `}
    {...props}
  >
    {props.children}
  </button>
);

export default ButtonBottomLeft;

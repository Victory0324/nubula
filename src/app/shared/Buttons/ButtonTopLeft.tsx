interface ButtonBottomLeftProps
  extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
}

const ButtonTopLeft: React.FC<ButtonBottomLeftProps> = ({
  className,
  ...props
}) => (
  <button
    className={`
      font-bold
      text-black
      bg-white

      py-4
      px-8

      rounded-tr-2xl
      rounded-br-2xl
      rounded-bl-3xl

      transition-opacity
      hover:opacity-70

      ${className}
    `}
    {...props}
  >
    {props.children}
  </button>
);

export default ButtonTopLeft;

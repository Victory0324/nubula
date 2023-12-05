interface ButtonBottomRightProps
  extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  transparent?: boolean;
}

const ButtonBottomRight: React.FC<ButtonBottomRightProps> = ({
  className,
  transparent = false,
  ...props
}) => (
  <button
    className={`
      font-bold

      px-8
      pt-1

      rounded-tl-xl
      rounded-tr-3xl
      rounded-bl-xl

      h-[35px]

      disabled:opacity-50

      transition-opacity
      hover:opacity-70

      ${className}
      ${
        transparent
          ? 'bg-transparent border border-white text-white'
          : 'bg-white text-black'
      }
    `}
    {...props}
  >
    {props.children}
  </button>
);

export default ButtonBottomRight;

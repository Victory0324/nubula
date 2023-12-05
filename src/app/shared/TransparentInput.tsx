import Tippy from '@tippyjs/react';
import { ReactElement, forwardRef, useMemo } from 'react';

export interface TransparentInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  showError?: boolean;
  error?: string;
  label?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  tooltip?: JSX.Element;
  tooltipVisible?: boolean;
}

const TransparentInput = forwardRef<HTMLInputElement, TransparentInputProps>(
  (
    {
      className,
      label,
      showError = false,
      error,
      icon,
      iconClassName,
      tooltip,
      tooltipVisible,
      ...props
    },
    ref
  ) => {
    const inputContainer = useMemo(
      () => (
        <div className='relative w-full'>
          <input
            ref={ref}
            className={`w-full h-[44px] transition-colors bg-transparent rounded-2xl border ps-4 ${
              icon ? 'pe-10' : 'pe-4'
            } ${
              error ? 'border-red-500' : 'border-white/75 hover:border-white'
            } ${className}
    transition-colors
`}
            {...props}
          ></input>
          {icon && (
            <div
              className={`flex absolute translate-y-[-50%] top-[50%] right-[15px]`}
            >
              {icon}
            </div>
          )}
        </div>
      ),
      [className, error, icon, props, ref]
    );

    return (
      <div className='w-full'>
        {label && (
          <div className='text-[15px] font-[350] text-white mb-2'>{label}</div>
        )}
        {tooltip ? (
          <Tippy
            content={tooltip}
            className='rounded-xl bg-gray-13 p-2.5 border border-white'
            placement='right'
            visible={tooltipVisible}
          >
            {inputContainer}
          </Tippy>
        ) : (
          inputContainer
        )}
        {showError && (
          <div className='h-5 w-full flex items-end justify-center'>
            {error && (
              <div className='text-[.6rem] uppercase text-center text-gray-999'>
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

TransparentInput.displayName = 'TransparentInput';

export default TransparentInput;

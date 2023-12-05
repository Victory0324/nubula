import React from 'react';

export default function Pill({
  children,
  disabled,
  onClick,
  className,
}: React.PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}>) {
  return (
    <button
      {...{ disabled, onClick }}
      className={`text-xs uppercase px-1 lg:px-3 py-1 rounded-full border border-purple-9a disabled:border-purple-9a/50 bg-purple-9a/20 text-white flex justify-center items-center gap-1 transition-colors disabled:hover:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

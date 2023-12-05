import React from 'react';

export default function ModalBody({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`p-8 flex flex-col items-center w-[327px] h-full lg:w-auto ${className}`}
    >
      {children}
    </div>
  );
}

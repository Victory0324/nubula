import { Transition } from '@headlessui/react';

export default function FadeInOut({
  children,
  show,
  className,
}: React.PropsWithChildren<{ show: boolean; className?: string }>) {
  return (
    <Transition {...{ show }}>
      <Transition.Child
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className={`${className} transition-all duration-[500ms]`}
      >
        {children}
      </Transition.Child>
    </Transition>
  );
}

import { ReactNode } from 'react';

const Sidebar = ({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) => {
  return (
    <div className='w-full h-full flex flex-col justify-between'>
      <div className='px-5 py-5'>{header}</div>
      <div className='px-5 overflow-y-scroll no-scrollbar flex-grow'>
        {children}
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default Sidebar;

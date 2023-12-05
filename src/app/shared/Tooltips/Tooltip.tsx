import { useSettings } from '@/app/providers/settings';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const { tooltips } = useSettings();

  if (!tooltips) {
    return <>{children}</>;
  }

  return (
    <Tippy
      content={content}
      arrow={false}
      className='!rounded-tr-2xl'
      placement='top-end'
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;

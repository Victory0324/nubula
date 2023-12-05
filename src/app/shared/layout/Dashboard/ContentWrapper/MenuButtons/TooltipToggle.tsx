import { useSettings } from '@/app/providers/settings';
import { SimpleToggle } from '@/app/shared/Toggle';

export default function TooltipToggle() {
  const { tooltips, setTooltips } = useSettings();
  return (
    <div className='flex items-center justify-between w-full'>
      <span>Tooltips</span>
      <SimpleToggle value={tooltips} onChange={setTooltips} />
    </div>
  );
}

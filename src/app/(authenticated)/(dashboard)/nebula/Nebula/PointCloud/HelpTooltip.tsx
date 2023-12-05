export default function HelpTooltip({ message = 'Click star to select' }) {
  return (
    <div
      className={`backdrop-blur bg-white/10 rounded-2xl p-4 relative transition-height ease-in-out overflow-hidden`}
    >
      <div className='flex gap-4 items-center shrink-0'>
        <div>{message}</div>
      </div>
    </div>
  );
}

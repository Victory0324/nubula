function AxisLabel({ label }: { label: string }) {
  return (
    <div className='grow-0 shrink select-none text-white/50 text-xs uppercase'>
      {label}
    </div>
  );
}
export default function XYControlsAxes() {
  return (
    <>
      <div className='absolute flex items-center justify-center w-full gap-4 top-1/2 px-16'>
        <AxisLabel label='Reverb' />
        <div className='grow shrink-0 h-[1px] bg-white/25' />
        <AxisLabel label='Stutter' />
      </div>
      <div className='flex flex-col items-center justify-center h-full gap-4 right-1/2 py-16'>
        <AxisLabel label='High pass' />
        <div className='grow shrink-0 w-[1px] bg-white/25' />
        <AxisLabel label='Low pass' />
      </div>
    </>
  );
}

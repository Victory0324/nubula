import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
export default function Slider({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className='border border-white rounded-full w-full h-[24px] overflow-hidden'>
      <RCSlider
        className='!h-full !m-0 !p-0'
        {...{ value, min, max }}
        onChange={(v) => onChange(v as number)}
        styles={{
          tracks: {
            background: `white`,
            height: '100%',
            borderRadius: '0',
          },
          track: {
            background: 'transparent',
            height: '100%',
          },
          rail: { display: 'none' },
          handle: {
            height: '100%',
            transform: 'translateX(-50%)',
            opacity: '0',
            width: '29px',
            margin: '0',
            borderRadius: 0,
            border: 'none',
          },
        }}
      />
    </div>
  );
}

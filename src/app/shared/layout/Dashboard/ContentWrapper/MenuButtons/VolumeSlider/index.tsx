import Slider from '@/app/shared/Slider';

export default function VolumeSlider({
  volume,
  setVolume,
  IconOff,
  IconOn,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  IconOff: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  IconOn: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}) {
  return (
    <div className='flex items-center gap-2 w-full'>
      <button
        className='w-[24px]'
        onClick={() => {
          setVolume(0);
        }}
      >
        <IconOff
          className={`hover:text-white transition-colors w-[24px] h-[24px]${
            volume === 0 ? '!text-white' : '!text-gray-999'
          }`}
        />
      </button>
      <Slider
        value={volume}
        onChange={(v) => {
          setVolume(v);
        }}
        min={20}
        max={100}
      />
      <button
        className='w-[24px]'
        onClick={() => {
          setVolume(100);
        }}
      >
        <IconOn
          className={`hover:text-white transition-colors w-[24px] h-[24px] ${
            volume === 100 ? 'text-white' : 'text-gray-999'
          }`}
        />
      </button>
    </div>
  );
}

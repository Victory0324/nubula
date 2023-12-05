import Pill from '@/app/shared/Pill';

const Mood = ({
  mood,
  isSelected,
  onSelect,
}: {
  mood: string;
  isSelected: boolean;
  onSelect: (mood: string) => void;
}) => {
  return (
    <Pill
      key={mood}
      onClick={() => onSelect(mood)}
      className={` ${
        isSelected
          ? 'border-transparent bg-white'
          : 'border-white/25 bg-transparent'
      } px-3 py-2 group hover:border-purple-9a transition-colors`}
    >
      <div className='flex items-center px-1 gap-4'>
        <div
          className={`rounded-full border ${
            isSelected
              ? 'border-transparent bg-purple-9a'
              : 'border-white/25 bg-transparent'
          }
               group-hover:border-purple-9a transition-colors w-[8px] h-[8px]`}
        ></div>
        <span
          className={`text-sm normal-case ${
            isSelected ? 'text-black' : 'text-white'
          } transition-colors`}
        >
          {mood}
        </span>
      </div>
    </Pill>
  );
};

export default Mood;

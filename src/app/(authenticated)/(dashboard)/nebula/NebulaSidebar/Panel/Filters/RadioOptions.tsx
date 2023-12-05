'use client';

type RadioOptionsProps = {
  items: string[];
  selected: string[];
  onSelect: (s: string) => void;
};

const RadioOptions = ({ items, selected, onSelect }: RadioOptionsProps) => {
  return (
    <div className='overflow-x-hidden mb-4'>
      <div
        className='
          grid
          grid-cols-2 xl:grid-cols-3
          gap-4 gap-y-4
          -mx-1
          overflow-x-hidden
        '
      >
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            onClick={() => onSelect(item)}
            className={`
            flex
            mx-1

            cursor-pointer
            noselect

            text-center
            items-center
            justify-center

            h-[69px]
            border border-gray-999
            rounded-2xl

            transition-colors 

            hover:border-white
            ${selected.includes(item) ? 'border-none bg-white text-black' : ''}
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioOptions;

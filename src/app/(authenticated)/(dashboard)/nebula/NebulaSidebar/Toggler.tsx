type TogglerProps = {
  items: string[];
  selected: string;
  onSelect: (s: string) => void;
};

const Toggler = ({ items, selected, onSelect }: TogglerProps) => {
  return (
    <div
      className='
        flex flex-row
        lg:w-full
        font-medium
        text-xs
        justify-between
        bg-gray-1e
        rounded-2xl
      '
    >
      {items.map((item) => (
        <div
          onClick={() => onSelect(item.toLowerCase())}
          className={`
            uppercase
            flex
            flex-1
            h-10
            px-2
            cursor-pointer
            noselect
            text-center
            items-center
            justify-center
            rounded-2xl
            transition-colors ease-in-out
            border
            font-medium            
            ${
              selected.toLowerCase() === item.toLowerCase()
                ? 'border-purple-9a bg-purple-9a/10'
                : 'border-transparent'
            }
          `}
          key={`item-${item}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Toggler;

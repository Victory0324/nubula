import Search from '@/app/(authenticated)/(dashboard)/nebula/assets/Search';

type Props = {
  value?: string;
  setValue: (s: string) => void;
};

const SearchInput = ({ value, setValue }: Props) => {
  return (
    <div className='relative flex items-center'>
      <input
        type='text'
        className='
            bg-gray-1e
            text-gray-80
            text-sm
            rounded-xl
            block
            w-full
            py-2.5
            px-6
            focus:outline-none
          '
        placeholder='Search here'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Search className='absolute right-0 mr-4' />
    </div>
  );
};

export default SearchInput;

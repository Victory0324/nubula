import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';
import DownArrow from './assets/DownArrow';

export default function Dropdown<T extends string>({
  selected,
  onSelect,
  items,
}: {
  selected: string;
  onSelect: (s: T) => void;
  items: { value: T; icon?: ReactNode }[];
}) {
  return (
    <Menu as='div' className='relative inline-block w-full'>
      <div>
        <Menu.Button className='hover:text-white/75 transition-colors uppercase font-medium inline-flex w-full rounded-md bg-gray-13 py-2 text-sm  text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 gap-4 items-center'>
          {selected}
          <DownArrow />
        </Menu.Button>
      </div>
      <Menu.Items className='bg-gray-13 border border-gray-999 rounded-2xl absolute mt-2 w-56 divide-y divide-white/25  ring-1 ring-black ring-opacity-5 focus:outline-none'>
        {items.map((item) => (
          <Menu.Item key={item.value}>
            {({ active }) => (
              <button
                onClick={() => onSelect(item.value)}
                className={`${
                  active || selected === item.value
                    ? 'text-purple-9a'
                    : 'text-white'
                } uppercase transition-colors group flex w-full items-center  p-4 text-sm gap-4`}
              >
                {item.icon}
                {item.value}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

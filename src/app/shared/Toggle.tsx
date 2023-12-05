import { Switch } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

export default function Toggle({
  options,
  value,
  setValue,
}: {
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className='flex gap-2 items-center'>
      <div
        className={`uppercase text-xs ${
          value === options[0] ? 'text-gray-ab/100' : 'text-gray-ab/50'
        } transition-colors`}
      >
        {options[0]}
      </div>
      <Switch
        checked={value === options[1]}
        onChange={() =>
          setValue(value === options[0] ? options[1] : options[0])
        }
        className={`bg-gray-3c relative inline-flex h-4 w-7 items-center rounded-full transition`}
      >
        <span
          className={`${
            value === options[1] ? 'translate-x-3' : 'translate-x-1'
          } inline-block h-3 w-3 transform rounded-full bg-gray-ab transition`}
        />
      </Switch>
      <div
        className={`uppercase text-xs ${
          value === options[1] ? 'text-gray-ab/100' : 'text-gray-ab/50'
        } transition-colors`}
      >
        {options[1]}
      </div>
    </div>
  );
}

export function SimpleToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={`relative inline-flex h-4 w-7 items-center rounded-full transition ${
        value ? 'bg-gray-ab' : 'bg-gray-3c'
      }`}
    >
      <span
        className={`${
          value ? 'translate-x-3 bg-gray-3c' : 'translate-x-1 bg-gray-ab'
        } inline-block h-3 w-3 transform rounded-full transition`}
      />
    </Switch>
  );
}

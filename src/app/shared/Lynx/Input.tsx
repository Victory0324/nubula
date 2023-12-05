import { useState } from 'react';
import DownArrow from '../assets/DownArrow';

export default function LynxInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <div className='relative mt-2'>
      <input
        type='text'
        className='
                  rounded-full
                  block
                  w-full
                  py-2
                  backdrop-blur
                  px-4
                  focus:outline-none
                  bg-white
                  bg-opacity-20
                  border
                  border-white
                '
        placeholder='Enter your message'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            if (value) {
              onSubmit(value);
            }
            setValue('');
          }
        }}
      />
      <div
        onClick={() => {
          if (value) {
            onSubmit(value);
            setValue('');
          }
        }}
        className={`absolute right-0 top-0 bottom-0 m-0 inline-flex items-center justify-center border border-white rounded-full w-11 ${
          value && 'bg-white'
        }`}
      >
        <DownArrow className={`rotate-180 ${value && 'text-black'}`} />
      </div>
    </div>
  );
}

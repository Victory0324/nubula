'use client';
import Check from '@/app/(authenticated)/(dashboard)/nebula/assets/Check';
import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';
import { useValidateSpecialCharacters } from '@/utils/hooks/forms/useValidate';
import { useState } from 'react';

function RenameInput({
  name,
  onSubmit,
  onCancel,
}: {
  name: string;
  onSubmit: (newName: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [newName, setNewName] = useState(name);
  const { validationError, validate } = useValidateSpecialCharacters();

  return (
    <>
      <div className='flex flex-row justify-between m-5 z-0 items-center gap-2 w-full'>
        <div className='flex flex-row items-center gap-2 grow h-[42px] lg:h-full  relative'>
          <input
            maxLength={24}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit(newName);
              }
            }}
            className={`bg-transparent border rounded-xl py-2 pl-4 pr-10 grow w-full ${
              validationError
                ? 'border-red-warning focus-visible:outline-none'
                : 'focus:outline-none focus:border-white hover:border-white border-gray-999'
            }`}
            value={newName}
            onChange={(e) => {
              validate(e.target.value);
              setNewName(e.target.value);
            }}
          />
          <div
            className='absolute right-2 hover:cursor-pointer'
            onClick={() => {
              !validationError && onSubmit(newName);
            }}
          >
            <Check />
          </div>
        </div>
        <div
          className='hover:cursor-pointer'
          onClick={() => {
            onCancel();
          }}
        >
          <X />
        </div>
      </div>
      {validationError && (
        <div className='text-red-warning'>{validationError}</div>
      )}
    </>
  );
}

export default RenameInput;

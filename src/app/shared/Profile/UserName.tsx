import { useCurrentUser } from '@/app/providers/User';
import Check from '@/app/(authenticated)/(dashboard)/nebula/assets/Check';
import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';
import Pencil from '../assets/Pencil';
import { useCallback, useEffect, useState } from 'react';
import Toast from '../Toasts/Toast';
import { toast } from 'react-toastify';
import NoizeBalance from './NoizeBalance';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';
import { useValidateSpecialCharacters } from '@/utils/hooks/forms/useValidate';

const UserName = ({ showRename }: { showRename?: boolean }) => {
  const { loading, user } = useCurrentUser();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const { validationError, validate } = useValidateSpecialCharacters();
  const updateUser = useUpdateUser();

  const onRename = useCallback(async () => {
    const res = await updateUser({ displayName: newName });

    setIsRenaming(false);
    if (res.success) {
      toast(<Toast type='success' title='Display name updated' />);
    } else {
      toast(<Toast type='error' title='Error' body={res.message} />);
    }
  }, [newName, updateUser]);

  useEffect(() => {
    setNewName(user?.displayName || '');
  }, [user?.displayName]);

  useEffect(() => {
    if (!showRename) setIsRenaming(false);
  }, [showRename]);

  if (loading) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        {isRenaming ? (
          <div className='flex'>
            <div className='group flex gap-2 items-center relative w-[330px]'>
              <input
                className={`transition-colors bg-transparent border rounded-xl py-2 pl-4 grow w-full pr-[30px] text-sm ${
                  validationError
                    ? 'border-red-warning focus-visible:outline-none'
                    : 'focus:outline-none focus:border-white hover:border-white border-gray-999'
                }`}
                value={newName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    !validationError && onRename();
                  }
                }}
                onChange={(e) => {
                  validate(e.target.value);
                  setNewName(e.target.value);
                }}
                maxLength={24}
              />
              <div
                className='absolute right-[44px] hover-purple'
                onClick={() => {
                  !validationError && onRename();
                }}
              >
                <Check />
              </div>
              <button
                disabled={!user?.displayName}
                className='hover-purple'
                onClick={() => {
                  setIsRenaming(false);
                  user?.displayName && setNewName(user?.displayName);
                }}
              >
                <X />
              </button>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 py-2'>
            <div
              className={`font-medium text-[15px] ${
                showRename ? 'hover:cursor-pointer' : ''
              }`}
              onDoubleClick={() => showRename && setIsRenaming(true)}
            >
              {user?.displayName}
            </div>
            <Pencil
              className={`hover-purple ${
                showRename ? '' : 'hidden'
              } w-[18px] h-[18px]`}
              onClick={() => setIsRenaming(true)}
            />
          </div>
        )}
      </div>
      <NoizeBalance />
    </div>
  );
};

export default UserName;

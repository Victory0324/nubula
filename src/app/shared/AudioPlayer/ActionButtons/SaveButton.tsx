import Loading from '../../assets/Loading';
import Tooltip from '../../Tooltips/Tooltip';
import useSaveInstance from '@/utils/hooks/instances/useSave';

interface SaveButtonProps {
  className?: string;
}
const SaveButton: React.FC<SaveButtonProps> = ({ className }) => {
  const { allowSave, handleSave, isSaving } = useSaveInstance();

  return (
    <>
      <Tooltip content='Click here to save your new track.'>
        <button
          disabled={!allowSave || isSaving}
          onClick={() => handleSave()}
          className={`btn btn-secondary btn-pinched-br w-full py-2 flex items-center justify-center ${className}`}
        >
          {isSaving ? <Loading className='text-white' /> : 'Save'}
        </button>
      </Tooltip>
    </>
  );
};

export default SaveButton;

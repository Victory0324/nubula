import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import usePatchTrack from '@/utils/hooks/tracks/usePatchTrack';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import { useCallback, useState } from 'react';
import Loading from '../../assets/Loading';
import { useValidateSpecialCharacters } from '@/utils/hooks/forms/useValidate';

export default function TrackRenameModal({
  track,
  instanceId,
  onAccept,
  onCancel,
}: {
  instanceId?: string;
  track: OutputTrack;
  onAccept: () => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [title, setNewTitle] = useState(track.name || track.generatedTrackName);
  const { validationError, validate } = useValidateSpecialCharacters();
  const patchTrack = usePatchTrack();

  const onSubmit = useCallback(async () => {
    if (!instanceId) throw 'No instance id to rename track';

    if (track.name === title) {
      // user did not change the name.
      onAccept();
      return;
    }

    try {
      setLoading(true);
      await patchTrack({
        trackId: instanceId,
        title,
        isFavourite: !!track.isFavourite,
      });
      onAccept();
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      toast(<Toast type='error' title='Something went wrong' body={message} />);
      onCancel();
    } finally {
      setLoading(false);
    }
  }, [
    instanceId,
    title,
    onAccept,
    onCancel,
    patchTrack,
    track.isFavourite,
    track.name,
  ]);

  return (
    <ModalBody className='w-[327px]'>
      <ModalHeader title='Confirm Creation Name' />
      <div className='flex flex-col gap-4 max-w-[400px]'>
        <div className='text-sm font-[350] text-center text-white/50'>
          Please confirm the name of your creation. Once owned, you will not be
          able to modify its name.
        </div>
        <input
          maxLength={24}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              !validationError && onSubmit();
            }
          }}
          className={`transition-colors bg-transparent border border-gray-999 rounded-xl py-2 pl-4 pr-10 w-full ${
            validationError
              ? 'border-red-warning focus-visible:outline-none'
              : 'focus:outline-none focus:border-white hover:border-white'
          }`}
          value={title}
          onChange={(e) => {
            validate(e.target.value);
            setNewTitle(e.target.value);
          }}
        />
        {validationError && (
          <div className='text-red-warning'>{validationError}</div>
        )}
        <div className='flex gap-4 mt-3'>
          <button
            className='btn btn-secondary btn-pinched-br grow'
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className='flex items-center justify-center btn btn-primary btn-pinched-br grow'
            onClick={() => {
              !validationError && onSubmit();
            }}
            disabled={loading}
          >
            {loading ? <Loading /> : 'Accept'}
          </button>
        </div>
      </div>
    </ModalBody>
  );
}

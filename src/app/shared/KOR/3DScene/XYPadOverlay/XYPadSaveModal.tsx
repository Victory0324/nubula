import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Modal from '@/app/shared/Modal';
import { useCallback, useState } from 'react';
import Loading from '@/app/shared/assets/Loading';
import { useMediaRecorder } from '@/app/providers/mediaRecorder';
import Image from 'next/image';
import usePostVideo from '@/utils/hooks/videos/usePostVideo';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { useMemo } from 'react';
import { useTracks } from '@/app/providers/tracks';

const XYPadSaveModal = NiceModal.create(() => {
  const [loading, setLoading] = useState(false);
  const modal = useModal();
  const { tracks } = useTracks();
  const postVideo = usePostVideo();
  const { selectedBackground } = useBackgrounds();
  const { outputTrack } = useOutputTrack();

  const { clearRecordedAsset, recordedAsset } = useMediaRecorder();
  const [name] = useState(outputTrack?.generatedTrackName || 'New recording');

  const [selectingThumbnail, setSelectingThumbnail] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    recordedAsset?.image
  );
  const [previewedThumbnail, setPreviewedThumbnail] = useState(
    recordedAsset?.image
  );

  const trackInstance = useMemo(() => {
    return tracks.find((t) => t.body.itemId === outputTrack?.itemId);
  }, [outputTrack, tracks]);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      if (!trackInstance) {
        throw Error('No output track!');
      }

      if (!recordedAsset) {
        throw Error('No recorded asset!');
      }

      if (!selectedBackground) {
        throw Error('No background!');
      }

      await postVideo({
        video: recordedAsset.video,
        thumbnail: selectedThumbnail as Blob,
        duration: recordedAsset.duration,
        trackTemplateIds: [trackInstance?.templateId],
        name,
        scenzNames: [selectedBackground.name],
      });
      toast(<Toast type='success' title='Recording saved' />);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      toast(<Toast type='error' title='Something went wrong' body={message} />);
    } finally {
      setLoading(false);
      modal.remove();
    }
  }, [
    trackInstance,
    recordedAsset,
    selectedBackground,
    postVideo,
    selectedThumbnail,
    name,
    modal,
  ]);

  if (!modal.visible || !recordedAsset || !outputTrack) {
    return null;
  }

  return (
    <Modal close={modal.remove}>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader
            title={selectingThumbnail ? 'Select Cover' : 'Video Recording'}
          />

          <div className='relative w-[400px]  h-[224px]'>
            {selectingThumbnail && previewedThumbnail ? (
              <Image
                src={URL.createObjectURL(previewedThumbnail)}
                className='object-contain rounded-lg'
                fill
                alt='Recording thumbnail'
              />
            ) : (
              <video
                className='w-full h-full'
                src={URL.createObjectURL(recordedAsset.video)}
                poster={URL.createObjectURL(selectedThumbnail as Blob)}
                controls
              />
            )}
          </div>
          {selectingThumbnail ? (
            <div className='flex max-w-full overflow-scroll mt-2'>
              {recordedAsset?.thumbnails
                .filter((t) => t.blob)
                .map((thumbnail) => (
                  <button
                    key={thumbnail.currentTime}
                    className={`relative w-[50px] h-[50px] rounded-lg overflow-hidden border border-transparent hover:border-purple-9a transition-colors`}
                    onClick={() =>
                      setPreviewedThumbnail(thumbnail.blob as Blob)
                    }
                  >
                    <Image
                      src={URL.createObjectURL(thumbnail.blob as Blob)}
                      className='object-contain'
                      fill
                      alt='Recording thumbnail'
                    />
                  </button>
                ))}
            </div>
          ) : (
            <>
              <button
                className='mt-4 text-xs hover-purple'
                onClick={() => setSelectingThumbnail(true)}
              >
                Select Cover
              </button>
              <div className='mt-4 mb-2 text-[18px]'>{name}</div>
            </>
          )}
          <div className='mt-4 flex flex-col gap-2 w-full'>
            <button
              disabled={loading}
              onClick={() => {
                if (selectingThumbnail) {
                  setSelectedThumbnail(previewedThumbnail);
                  setSelectingThumbnail(false);
                } else handleSave();
              }}
              className='btn btn-primary rounded-full w-full flex justify-center items-center'
            >
              {loading ? <Loading className='text-white' /> : 'Save'}
            </button>
            {selectingThumbnail ? (
              <button
                className='btn btn-secondary rounded-full w-full'
                onClick={() => {
                  setPreviewedThumbnail(selectedThumbnail);
                  setSelectingThumbnail(false);
                }}
              >
                Cancel
              </button>
            ) : (
              <button
                disabled={loading}
                className='btn btn-secondary rounded-full w-full'
                onClick={() => {
                  clearRecordedAsset();
                  modal.remove();
                }}
              >
                Discard
              </button>
            )}
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});

export default XYPadSaveModal;

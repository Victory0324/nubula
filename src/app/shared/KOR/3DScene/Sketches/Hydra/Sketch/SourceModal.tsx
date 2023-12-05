import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import { ScenZBackground } from '@/utils/types/scenz';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const SourceModal = NiceModal.create(
  ({
    name,
    sketch,
    url,
    author,
    modifiedUrl,
    modifiedAuthor,
    modifiedDate,
  }: Partial<ScenZBackground> & { sketch?: Function }) => {
    const modal = useModal();

    if (!modal.visible) return null;

    return (
      <Modal close={modal.remove}>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title={name} />
            <div className='flex flex-col gap-4 items-center'>
              <div className='text-xs font-[350] text-white/50 max-w-full break-all'>
                Created by <span className='text-purple-9a'>{author}</span>
              </div>
              {sketch && (
                <div className='text-sm font-[350] text-white/50 max-w-full break-all'>
                  {sketch.toString()}
                </div>
              )}
              <div className='text-xs font-[350] text-white/50 max-w-full break-all'>
                Source:{' '}
                <a href={url} className='hover-purple'>
                  {url}
                </a>
              </div>
              {modifiedUrl && (
                <div className='text-center text-xs font-[350] text-white/50 max-w-full break-all'>
                  Modified source:{' '}
                  <a href={modifiedUrl} className='hover-purple'>
                    {modifiedUrl}
                  </a>{' '}
                  <br />
                  (modified on {modifiedDate} by {modifiedAuthor})
                </div>
              )}
            </div>
            <button
              className='mt-4 btn btn-secondary btn-pinched-br rounded-tl-2xl'
              onClick={modal.remove}
            >
              Close
            </button>
          </ModalBody>
        </CenteredModalContent>
      </Modal>
    );
  }
);

export default SourceModal;

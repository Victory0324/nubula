import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import { useCallback, useState } from 'react';
import StyledRadioGroup, {
  RadioOption,
} from '@/app/shared/formElements/StyledRadioGroup';
import { useOutputTrack } from '@/app/providers/outputTrack';
import StyledRange from '@/app/shared/formElements/StyledRange';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const RecreateModal = NiceModal.create(() => {
  const { recreateTrack, creating } = useOutputTrack();
  const modal = useModal();

  const options: RadioOption[] = [
    { label: 'New Track', value: 'new' },
    { label: 'Original Stem', value: 'original' },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleConfirm = useCallback(() => {
    const changeAmount = selectedOption === 'new' ? 1 : sliderValue / 100;

    recreateTrack(changeAmount);
    modal.remove();
  }, [modal, recreateTrack, selectedOption, sliderValue]);

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  if (!modal.visible) return null;

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };

  return (
    <Modal close={modal.remove}>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader title='Recreate!' />
          <div className='text-sm font-[350] text-center text-white/50'>
            Choose how you want to recreate
          </div>

          <div className='flex my-3 w-full justify-between'>
            <StyledRadioGroup
              options={options}
              onChange={handleRadioChange}
              selectedValue={selectedOption}
            />
          </div>

          <div className='w-full border border-b-1 border-t-0 border-gray-53 my-2 ' />

          <div
            className={`text-center transition-opacity duration-300 px-2 mt-4 ${
              selectedOption === 'new' && 'opacity-30 pointer-events-none'
            }`}
          >
            <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
              Use the bar to set how different you want your recreated track to
              be from the original track.
            </div>

            <div className='flex flex-row w-full justify-between mb-5'>
              <span>0%</span>
              <StyledRange
                min={0}
                max={100}
                step={1}
                initialValue={sliderValue}
                onChange={handleSliderChange}
              />
              <span className=''>100%</span>
            </div>
          </div>
          <div className='flex gap-4 mt-3'>
            <button
              className='btn btn-secondary btn-pinched-br rounded-tl-2xl'
              onClick={modal.remove}
            >
              Cancel
            </button>
            <button
              className='btn btn-primary btn-pinched-br rounded-tl-2xl'
              onClick={handleConfirm}
              disabled={creating || !selectedOption}
            >
              Confirm
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});

export default RecreateModal;

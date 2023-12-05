import { isDevOrPreview } from '@/utils/helpers/env';
import { useTour } from '../../../../../providers/tour';
import MenuLinkButton from '../../../../Buttons/MenuLinkButton';
import { DeepLinkModalProps } from '../DeepLinkModal';
import RestartTutorialIcon from '../assets/RestartTutorialIcon';
import Toggle from '@/app/shared/Toggle';
import Zap from '@/app/shared/assets/Zap';
import ChatIcon from '@/app/shared/assets/Chat';
import { useSettings } from '@/app/providers/settings';
import OutputVolumeSlider from './VolumeSlider/Output';
import TooltipToggle from './TooltipToggle';
import QuestionMarkIcon from '@/app/shared/assets/QuestionMarkIcon';
import SFXVolumeSlider from './VolumeSlider/SFX';
import MenuItem from './MenuItem';
import IframeModal from '../IFrameModal';
import { useModal } from '@ebay/nice-modal-react';

interface MenuButtonsProps {
  setIsMenuOpen: (open: boolean) => void;
  setDeepLinkModalProps: React.Dispatch<
    React.SetStateAction<DeepLinkModalProps>
  >;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({
  setIsMenuOpen,
  setDeepLinkModalProps,
}) => {
  const iframeModal = useModal(IframeModal);
  const { autogenerateCheck, setAutogenerateCheck } = useSettings();

  const { restartTour } = useTour();

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-gray-999 text-sm font-light '>Settings</div>
      <MenuLinkButton
        onClick={() => {
          restartTour();
          setIsMenuOpen(false);
        }}
        icon={<RestartTutorialIcon />}
      >
        Restart Tutorial
      </MenuLinkButton>
      <MenuItem>
        <OutputVolumeSlider />
      </MenuItem>
      <MenuItem>
        <SFXVolumeSlider />
      </MenuItem>
      <MenuItem icon={<QuestionMarkIcon />}>
        <TooltipToggle />
      </MenuItem>

      <div className='text-gray-999 text-sm font-light '>Other</div>

      <MenuLinkButton
        icon={<ChatIcon />}
        onClick={() =>
          setDeepLinkModalProps({
            isOpen: true,
            siteName: 'Support',
            url: 'https://pixelynxio.zendesk.com',
          })
        }
      >
        Support
      </MenuLinkButton>
      <MenuLinkButton
        icon={<Zap />}
        onClick={() =>
          iframeModal.show({
            siteName: 'KORUS Labs',
            url: 'https://korus.co/koruslabs',
          })
        }
      >
        KORUS Labs
      </MenuLinkButton>

      <div className='flex gap-4 text-xs uppercase h-8 items-center justify-between text-gray-999'>
        {isDevOrPreview() && (
          <>
            <span>Autogenerate check?</span>
            <Toggle
              options={['Yes', 'No']}
              value={autogenerateCheck ? 'Yes' : 'No'}
              setValue={(v) => setAutogenerateCheck(v === 'Yes')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MenuButtons;

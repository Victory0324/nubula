import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import Facebook from './Facebook';
import Twitter from './Twitter';
import WhatsApp from './WhatsApp';
import LinkedIn from './LinkedIn';
import Telegram from './Telegram';
import CopyLink from './CopyLink';
import { useMemo } from 'react';
import { absoluteURL } from '@/utils/helpers/urls';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

type Platform = {
  title: string;
  icon: React.FC;
  link: string;
};

const ShareModal = NiceModal.create(({ url }: { url: string }) => {
  const uri = useMemo(() => absoluteURL(url), [url]);
  const modal = useModal();

  const platforms: Platform[] = useMemo(() => {
    return [
      {
        title: 'Facebook',
        icon: Facebook,
        link: `https://www.facebook.com/sharer/sharer.php?u=${uri}`,
      },
      {
        title: 'Whatsapp',
        icon: WhatsApp,
        link: `https://wa.me/?text=${uri}`,
      },
      {
        title: 'Twitter',
        icon: Twitter,
        link: `https://twitter.com/intent/tweet?url=${uri}`,
      },
      {
        title: 'LinkedIn',
        icon: LinkedIn,
        link: `https://www.linkedin.com/shareArticle?mini=true&url=${uri}`,
      },
      {
        title: 'Telegram',
        icon: Telegram,
        link: `https://telegram.me/share/url?url=${uri}`,
      },
    ];
  }, [uri]);

  if (!modal.visible) return null;

  return (
    <Modal close={modal.remove}>
      <CenteredModalContent>
        <ModalBody>
          <ModalHeader onClose={modal.remove} title='Share' />
          <div className='grid grid-cols-3 grid-rows-2 gap-8'>
            {platforms.map((platform) => {
              return (
                <a key={platform.title} target='_blank' href={platform.link}>
                  <SocialIcon title={platform.title} Icon={platform.icon} />
                </a>
              );
            })}

            <button onClick={() => navigator.clipboard.writeText(uri)}>
              <SocialIcon title={'Copy Link'} Icon={CopyLink} />
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});

function SocialIcon({ title, Icon }: { title: string; Icon: React.FC }) {
  return (
    <div className='text-center items-center flex flex-col gap-2 '>
      <div className='text-white w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-gray-200 hover:text-zinc-900'>
        <Icon />
      </div>
      <p className='text-sm'>{title}</p>
    </div>
  );
}

export default ShareModal;

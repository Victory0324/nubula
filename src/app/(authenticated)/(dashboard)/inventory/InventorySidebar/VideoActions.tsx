import { Menu } from '@headlessui/react';
import Kebab from '../assets/Kebab';
import Trash from '@/app/shared/assets/Trash';
import ExternalLink from '../assets/ExternalLink';
import Pencil from '@/app/shared/assets/Pencil';
import Cart from '../assets/Cart';
import RenameModal from '@/app/shared/inventory/RenameModal';
import ShareModal from '@/app/shared/ShareModal';
import { absoluteURL } from '@/utils/helpers/urls';
import { useAnalytics } from '@/app/providers/analytics';
import useDownload from '@/utils/hooks/tracks/useDownload';
import DownloadIcon from '@/app/shared/assets/DownloadIcon';
import DeleteModal from '@/app/shared/inventory/DeleteModal';
import { useModal } from '@ebay/nice-modal-react';
import BuyTrackFlow from '@/app/shared/wallet/BuyTrackFlow';
import Loading from '@/app/shared/assets/Loading';
import useDeleteVideo from '@/utils/hooks/videos/useDeleteVideo';
import usePatchVideo from '@/utils/hooks/videos/usePatchVideo';
import Toast from '@/app/shared/Toasts/Toast';
import { toast } from 'react-toastify';
import Heart from '@/app/shared/assets/Heart';

export default function VideoActions(video: VideoInstance) {
  const { track: trackEvent } = useAnalytics();
  const deleteModal = useModal(DeleteModal);
  const deleteVideo = useDeleteVideo(video.templateId);
  const trackShareModal = useModal(ShareModal);
  const renameModal = useModal(RenameModal);
  const patchVideo = usePatchVideo();

  // XYPAD-FIXME: Convert useDownload into a generalized instanceDownload hook
  const { download, preparing } = useDownload(video.body.itemId);

  // XYPAD-FIXME: Convert BuyTrackFlow into a generalized one or create another BuyVideoFlow.
  const buyTrackFlow = useModal(BuyTrackFlow);

  return (
    <>
      <Menu as='div' className='relative'>
        <Menu.Button className='flex items-center rotate-90'>
          <Kebab
            width='20'
            height='20'
            className='hover:text-purple-9a transition-colors'
          />
        </Menu.Button>

        <Menu.Items className='bg-gray-13 border border-gray-999 rounded-2xl absolute mt-2 w-56 -left-100 -right-0 divide-y divide-white/25 text-xs ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
          {!video.tokenId ? (
            <Menu.Item>
              <a
                onClick={(_) => {
                  renameModal.show({
                    name: video.name,
                    onRename: (newName) => {
                      return patchVideo({
                        instanceId: video.instanceId,
                        title: newName,
                        isFavourite: video.isFavourite,
                      });
                    },
                  });
                }}
                className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
              >
                <Pencil />
                Edit Video Name
              </a>
            </Menu.Item>
          ) : (
            <></>
          )}
          {
            // you can't delete a video you own.
            !video.tokenId && (
              <Menu.Item>
                <a
                  onClick={(_) => {
                    deleteModal.show({ deleter: deleteVideo });
                  }}
                  className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
                >
                  <Trash />
                  Delete
                </a>
              </Menu.Item>
            )
          }
          <Menu.Item>
            <a
              onClick={async (_) => {
                try {
                  await patchVideo({
                    instanceId: video.instanceId,
                    title: video.name,
                    isFavourite: !video.isFavourite,
                  });
                  toast(<Toast type='success' title='Item Favorited' />);
                } catch (err) {
                  if (err instanceof Error) {
                    toast(<Toast type='error' title={err.message} />);
                  } else {
                    throw err;
                  }
                }
              }}
              className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
            >
              <Heart />
              Favorite
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              onClick={async (_) => {
                trackEvent({
                  category: 'share',
                  action: 'open_sharing',
                  name: video.body.itemId,
                });
                if (navigator.share) {
                  await navigator.share({
                    url: absoluteURL(`/video/${video.body.itemId}`),
                  });
                } else {
                  // fallback without native sharing.
                  trackShareModal.show({
                    url: `/video/${video.body.itemId}`,
                  });
                }
              }}
              className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
            >
              <ExternalLink />
              Share
            </a>
          </Menu.Item>
          {!video.tokenId && (
            <Menu.Item>
              <button
                className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
                onClick={() =>
                  buyTrackFlow.show({
                    // TODO passVideo here.
                    instanceId: video.instanceId,
                  })
                }
              >
                <Cart />
                Own
              </button>
            </Menu.Item>
          )}
          {video.tokenId && (
            <Menu.Item>
              <button
                disabled={preparing}
                onClick={(_) => {
                  download();
                }}
                className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
              >
                <DownloadIcon />
                {preparing ? <Loading /> : 'Download'}
              </button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Menu>
    </>
  );
}

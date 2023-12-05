import { Menu } from '@headlessui/react';
import Kebab from '../assets/Kebab';
import RecreateAudio from '../assets/RecreateAudio';
import Trash from '@/app/shared/assets/Trash';
import ExternalLink from '../assets/ExternalLink';
import Pencil from '@/app/shared/assets/Pencil';
import Cart from '../assets/Cart';
import RenameModal from '@/app/shared/inventory/RenameModal';
import ShareModal from '@/app/shared/ShareModal';
import { absoluteURL } from '@/utils/helpers/urls';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useAnalytics } from '@/app/providers/analytics';
import useDownload from '@/utils/hooks/tracks/useDownload';
import DownloadIcon from '@/app/shared/assets/DownloadIcon';
import DeleteModal from '@/app/shared/inventory/DeleteModal';
import { useModal } from '@ebay/nice-modal-react';
import RecreateModal from '../../output/OutputSidebar/RecreateModal';
import BuyTrackFlow from '@/app/shared/wallet/BuyTrackFlow';
import Loading from '@/app/shared/assets/Loading';
import useDeleteTrack from '@/utils/hooks/tracks/useDeleteTrack';
import usePatchTrack from '@/utils/hooks/tracks/usePatchTrack';

export default function TrackAction(track: TrackInstance) {
  const { track: trackEvent } = useAnalytics();
  const { outputTrack, setOutputTrack } = useOutputTrack();
  const deleteModal = useModal(DeleteModal);
  const deleteTrack = useDeleteTrack(track.templateId);
  const renameModal = useModal(RenameModal);
  const trackShareModal = useModal(ShareModal);
  const { download, preparing } = useDownload(track.body.itemId);
  const recreateModal = useModal(RecreateModal);
  const buyTrackFlow = useModal(BuyTrackFlow);
  const patchTrack = usePatchTrack();

  return (
    <>
      <Menu as='div' className='relative w-full'>
        <Menu.Button className='flex items-center'>
          <Kebab
            width='20'
            height='20'
            className='hover:text-purple-9a transition-colors'
          />
        </Menu.Button>

        <Menu.Items className='bg-gray-13 border border-gray-999 rounded-2xl absolute mt-2 w-56 -left-100 -right-0 divide-y divide-white/25 text-xs ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
          {!track.tokenId ? (
            <Menu.Item>
              <a
                onClick={(_) => {
                  renameModal.show({
                    name: track.name,
                    onRename: (newName) => {
                      return patchTrack({
                        trackId: track.instanceId,
                        title: newName,
                        isFavourite: track.isFavourite,
                      });
                    },
                  });
                }}
                className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
              >
                <Pencil />
                Edit Track Name
              </a>
            </Menu.Item>
          ) : (
            <></>
          )}
          <Menu.Item>
            <a
              className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
              onClick={() => {
                if (!outputTrack) {
                  setOutputTrack(track.body as OutputTrack);
                }

                recreateModal.show();
              }}
            >
              <RecreateAudio />
              Recreate
            </a>
          </Menu.Item>
          {
            // you can't delete a track you own.
            !track.tokenId && (
              <Menu.Item>
                <a
                  onClick={(_) => {
                    deleteModal.show({
                      deleter: deleteTrack,
                    });
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
                trackEvent({
                  category: 'share',
                  action: 'open_sharing',
                  name: track.body.itemId,
                });
                if (navigator.share) {
                  await navigator.share({
                    url: absoluteURL(`/track/${track.body.itemId}`),
                  });
                } else {
                  // fallback without native sharing.
                  trackShareModal.show({
                    url: `/track/${track.body.itemId}`,
                  });
                }
              }}
              className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
            >
              <ExternalLink />
              Share
            </a>
          </Menu.Item>
          {!track.tokenId && (
            <Menu.Item>
              <button
                className='uppercase hover:text-purple-9a transition-colors group flex w-full items-center p-2 gap-2'
                onClick={() =>
                  buyTrackFlow.show({
                    track: {
                      ...track.body,
                      name: track.name,
                      isFavourite: track.isFavourite,
                    },
                    instanceId: track.instanceId,
                  })
                }
              >
                <Cart />
                Own
              </button>
            </Menu.Item>
          )}
          {track.tokenId && (
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

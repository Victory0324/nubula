'use client';

import DeleteModal from '@/app/shared/inventory/DeleteModal';
import ShareModal from '@/app/shared/ShareModal';
import RecreateModal from '@/app/(authenticated)/(dashboard)/output/OutputSidebar/RecreateModal';
import TrackLimitModal from '@/app/shared/inventory/TrackLimitModal';
import NiceModal from '@ebay/nice-modal-react';
import BuyTrackFlow from '@/app/shared/wallet/BuyTrackFlow';
import IframeModal from '@/app/shared/layout/Dashboard/ContentWrapper/IFrameModal';
import OutputTrackNavigationConfirmationModal from '@/app/(authenticated)/(dashboard)/nebula/Nebula/OutputTrackNavigationConfirmationModal';
import ModalProvider from '../modal';
import UnlockStemWithNoizModal from '@/app/(authenticated)/(dashboard)/nebula/Nebula/UnlockStemWithNoizModal';
import UnlockInventorySlotWithNoizModal from '@/app/(authenticated)/(dashboard)/inventory/InventorySidebar/UnlockInventorySlotWithNoizModal';
import SuccessModal from '@/app/(authenticated)/(dashboard)/korus/KorusSidebar/modals/SuccessModal';
import XYPadSaveModal from '@/app/shared/KOR/3DScene/XYPadOverlay/XYPadSaveModal';

NiceModal.register('UnlockStemWithNoiz', UnlockStemWithNoizModal);
NiceModal.register(
  'UnlockInventorySlotWithNoiz',
  UnlockInventorySlotWithNoizModal
);
NiceModal.register('TrackDelete', DeleteModal);
NiceModal.register('KorSuccessModal', SuccessModal);
NiceModal.register('Share', ShareModal);
NiceModal.register('Recreate', RecreateModal);
NiceModal.register('TrackLimit', TrackLimitModal);
NiceModal.register('BuyTrackFlow', BuyTrackFlow);
NiceModal.register('Iframe', IframeModal);
NiceModal.register(
  'OutputTrackConfirmationModal',
  OutputTrackNavigationConfirmationModal
);
NiceModal.register('XyPadSaveModal', XYPadSaveModal);

export default function AuthenticatedModals({
  children,
}: React.PropsWithChildren) {
  return <ModalProvider>{children}</ModalProvider>;
}

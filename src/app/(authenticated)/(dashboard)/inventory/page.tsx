'use client';

import Kor3DScene from '@/app/shared/KOR/3DScene';
import NiceModal from '@ebay/nice-modal-react';
import RenameModal from '@/app/shared/inventory/RenameModal';
import { useMediaRecorder } from '@/app/providers/mediaRecorder';
import VideoRecording from './InventorySidebar/VideoRecording';

// page specific modals
NiceModal.register('Inventory.TrackTitle', RenameModal);

const InventoryPage = () => {
  const { selectedRecording } = useMediaRecorder();

  if (selectedRecording) return <VideoRecording />;
  return <Kor3DScene />;
};

export default InventoryPage;

'use client';

import { useModal } from '@ebay/nice-modal-react';
import MaintenanceModal from '../shared/MaintenanceModal';
import { useCurrentUser } from './User';
import { useEffect } from 'react';

export default function MaintenanceProvider({
  children,
}: React.PropsWithChildren) {
  const maintenanceModal = useModal(MaintenanceModal);
  const { logout } = useCurrentUser();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
      logout();
      maintenanceModal.show();
    } else maintenanceModal.hide();
  }, [logout, maintenanceModal]);

  return process.env.NEXT_PUBLIC_MAINTENANCE_MODE ? <></> : children;
}

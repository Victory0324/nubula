'use client';

import { FreeGenKorProvider } from '@/app/providers/freeGenKor';
import NebulaProviders from '@/app/(authenticated)/(dashboard)/nebula/providers';
import { BackgroundsProvider } from '@/app/providers/backgrounds';
import { KorsProvider } from '@/app/providers/kors';
import { MintsProvider } from '@/app/providers/mints';
import { TourProvider } from '@/app/providers/tour';
import { TracksProvider } from '@/app/providers/tracks';
import { MobileTrayProvider } from '@/app/providers/mobileTray';
import { RequestsProvider } from '@/app/providers/requests';
import { SettingsProvider } from '@/app/providers/settings';
import WagmiProvider from '@/app/providers/wagmiProvider';
import { ChatProvider } from '@/app/providers/chat';
import NiceModal from '@ebay/nice-modal-react';
import MaintenanceModal from '@/app/shared/MaintenanceModal';
import AuthenticatedModals from '@/app/providers/authenticated/modals';
import { CurrencyProvider } from '@/app/providers/currency';
import { AudioXYEffectsProvider } from '@/app/providers/audioXYEffects';
import { MediaRecorderProvider } from '../../providers/mediaRecorder';
import { VideosProvider } from '@/app/providers/videos';

NiceModal.register('Maintenance', MaintenanceModal);

export default function AuthenticatedProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <SettingsProvider>
      <RequestsProvider>
        <WagmiProvider>
          <MintsProvider>
            <MobileTrayProvider>
              <TracksProvider>
                <VideosProvider>
                  <KorsProvider>
                    <BackgroundsProvider>
                      <CurrencyProvider>
                        <NebulaProviders>
                          <TourProvider>
                            <FreeGenKorProvider>
                              <ChatProvider>
                                <AudioXYEffectsProvider>
                                  <MediaRecorderProvider>
                                    <AuthenticatedModals>
                                      {children}
                                    </AuthenticatedModals>
                                  </MediaRecorderProvider>
                                </AudioXYEffectsProvider>
                              </ChatProvider>
                            </FreeGenKorProvider>
                          </TourProvider>
                        </NebulaProviders>
                      </CurrencyProvider>
                    </BackgroundsProvider>
                  </KorsProvider>
                </VideosProvider>
              </TracksProvider>
            </MobileTrayProvider>
          </MintsProvider>
        </WagmiProvider>
      </RequestsProvider>
    </SettingsProvider>
  );
}

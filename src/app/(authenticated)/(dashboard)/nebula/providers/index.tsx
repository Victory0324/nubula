import { StemsProvider } from './stems';
import { OutputTrackProvider } from '@/app/providers/outputTrack';
import { AudioPlayerProvider } from './audioPlayer';

export default function NebulaProviders({ children }: React.PropsWithChildren) {
  return (
    <StemsProvider>
      <OutputTrackProvider>
        <AudioPlayerProvider>{children}</AudioPlayerProvider>
      </OutputTrackProvider>
    </StemsProvider>
  );
}

import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import useDownload from '@/utils/hooks/tracks/useDownload';
import Loading from '../../assets/Loading';

export default function DownloadButton({ className }: { className: string }) {
  const { currentTrack } = useAudioPlayer();
  const { download, preparing } = useDownload(currentTrack?.itemId);

  return (
    <button
      onClick={download}
      disabled={preparing}
      className={`btn btn-primary w-full py-2 ${className} flex justify-center`}
    >
      {preparing ? <Loading /> : 'Download'}
    </button>
  );
}

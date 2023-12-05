import { useSettings } from '@/app/providers/settings';
import VolumeOffIcon from '@/app/shared/assets/VolumeOff';
import VolumeOnIcon from '@/app/shared/assets/VolumeOn';
import VolumeSlider from '.';

export default function OutputVolumeSlider() {
  const { outputVolume, setOutputVolume } = useSettings();

  return (
    <VolumeSlider
      IconOff={VolumeOffIcon}
      IconOn={VolumeOnIcon}
      volume={outputVolume}
      setVolume={setOutputVolume}
    />
  );
}

import { useSettings } from '@/app/providers/settings';
import Zap from '@/app/shared/assets/Zap';
import VolumeSlider from '.';
import ZapXL from '@/app/shared/assets/ZapXL';

export default function SFXVolumeSlider() {
  const { sfxVolume, setSfxVolume } = useSettings();

  return (
    <VolumeSlider
      IconOff={Zap}
      IconOn={ZapXL}
      volume={sfxVolume}
      setVolume={setSfxVolume}
    />
  );
}

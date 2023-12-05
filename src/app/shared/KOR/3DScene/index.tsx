'use client';
import { Canvas } from '@react-three/fiber';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Scene from './Scene';
import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { useOutputTrack } from '../../../providers/outputTrack';
import Crosshairs from './assets/Crosshairs';
import { useKors } from '@/app/providers/kors';
import { AnimationFrames } from './RotatingKor/Kor';
import Toggle from '../../Toggle';
import { useBackgrounds } from '@/app/providers/backgrounds';
import CustomBackground from './Background/Custom';
import Info from '@/app/(authenticated)/(dashboard)/inventory/assets/Info';
import { useModal } from '@ebay/nice-modal-react';
import SourceModal from './Sketches/Hydra/Sketch/SourceModal';
import XYPadOverlay from './XYPadOverlay';
import XYPadSaveModal from './XYPadOverlay/XYPadSaveModal';
import { useMediaRecorder } from '@/app/providers/mediaRecorder';

const Kor3DScene = ({
  kor,
  allowHideKor = true,
}: {
  kor?: Kor;
  allowHideKor?: boolean;
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const parent = useRef<HTMLDivElement>(null);
  const sourceModal = useModal(SourceModal);
  const { previewedBackground, selectedBackground } = useBackgrounds();
  const { recordedAsset } = useMediaRecorder();
  const { show: showXYPadSaveModal } = useModal(XYPadSaveModal);

  const [showKor, setShowKor] = useState(true);
  const { selectedKor } = useKors();

  // If no KOR is provided, we will render the current selectedKor
  const korToRender = useMemo(() => {
    return showKor ? kor || selectedKor : undefined;
  }, [showKor, kor, selectedKor]);

  const { playing } = useAudioPlayer();
  const { creating } = useOutputTrack();

  const [resetCamera, setResetCamera] = useState<boolean>(false);

  const [animationState, setAnimationState] =
    useState<keyof typeof AnimationFrames>('idle');

  useEffect(() => {
    if (creating) {
      setAnimationState('loading');
    } else if (playing) {
      setAnimationState('playback');
    } else {
      setAnimationState('idle');
    }
  }, [creating, playing]);

  useEffect(() => {
    if (recordedAsset !== null) {
      showXYPadSaveModal();
    }
  }, [recordedAsset, showXYPadSaveModal, selectedBackground]);

  return (
    <div id='canvas-container' className='w-full h-full relative' ref={parent}>
      <XYPadOverlay {...{ canvas }} />
      {previewedBackground?.custom && <CustomBackground />}
      {previewedBackground?.url && (
        <div className='absolute top-0 left-0 m-4 z-10'>
          <Info
            className='hover-purple hover:cursor-pointer'
            onClick={() => sourceModal.show({ ...previewedBackground })}
          />
        </div>
      )}
      <Suspense fallback={null}>
        <Canvas
          ref={canvas}
          // I believe these props are already default
          gl={{ alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000, 0);
          }}
          eventSource={parent.current || undefined}
          eventPrefix='client'
        >
          <Scene
            kor={korToRender}
            state={animationState}
            {...{
              resetCamera,
            }}
          />
        </Canvas>
      </Suspense>
      <div className='absolute z-[6] right-0 top-1/2 mr-4 flex flex-col items-end gap-4'>
        <Crosshairs
          className='hover:cursor-pointer hover:text-white/75 transition-colors'
          onClick={() => setResetCamera(!resetCamera)}
        />
        {allowHideKor && (
          <div className='flex flex-col gap-2 text-xs uppercase h-8 items-center justify-between text-gray-999'>
            <>
              <span>Show kor?</span>
              <Toggle
                options={['Yes', 'No']}
                value={showKor ? 'Yes' : 'No'}
                setValue={(v) => setShowKor(v === 'Yes')}
              />
            </>
          </div>
        )}
      </div>
      {creating && (
        <div className='w-full md:w-auto absolute top-[40px] md:top-[15%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center shadow-glow backdrop-blur-xl rounded-xl p-4 bg-gray-13'>
          <h3 className='uppercase text-lg'>
            Your song is generating. please hold....
          </h3>
        </div>
      )}
    </div>
  );
};

export default Kor3DScene;

import { useAudioXYEffects } from '@/app/providers/audioXYEffects';
import XYPadIcon from '@/app/shared/assets/XYPad';
import XYControls from './XYControls';
import { RefObject, useCallback, useMemo } from 'react';
import { useMediaRecorder } from '@/app/providers/mediaRecorder';
import StopRecording from '@/app/shared/assets/StopRecording';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useAnalytics } from '@/app/providers/analytics';
import { useCurrentUser } from '@/app/providers/User';
import Tooltip from '@/app/shared/Tooltips/Tooltip';

export default function XYPadOverlay({
  canvas,
}: {
  canvas: RefObject<HTMLCanvasElement>;
}) {
  const { setupRecorder, stopRecording, state } = useMediaRecorder();
  const { track } = useAnalytics();
  const { user } = useCurrentUser();
  const { outputTrack } = useOutputTrack();
  const { enabled, setEnabled } = useAudioXYEffects();

  const startXYPadRecording = useCallback(() => {
    track({
      category: 'xypad',
      action: 'recording_on',
      name: user ? user.userId : 'user',
    });
    if (canvas.current) setupRecorder(canvas.current);
  }, [canvas, setupRecorder]);

  const stopXYPadRecording = useCallback(() => {
    track({
      category: 'xypad',
      action: 'recording_off',
      name: user ? user.userId : 'user',
    });
    stopRecording();
  }, []);

  const allowRecording = useMemo(
    () => enabled && outputTrack,
    [enabled, outputTrack]
  );

  const setXYPad = useCallback(
    (on: boolean) => {
      const action = on ? 'turn_on' : 'turn_off';
      track({
        category: 'xypad',
        action: action,
        name: user ? user.userId : 'user',
      });
      setEnabled(on);
    },
    [track, user, setEnabled]
  );

  return (
    <div className='z-[5] absolute w-full h-full'>
      <XYControls {...{ enabled }} />
      <div className='absolute pr-[70px] lg:pr-[85px] z-[9] flex items-center justify-between w-full bottom-[40px]'>
        <button
          disabled={!allowRecording}
          className={`transition-opacity btn px-6 rounded-full ml-5 flex items-center justify-center gap-2 ${allowRecording ? 'opacity-100' : 'opacity-0'
            } ${state === 'idle' ? 'btn-secondary' : 'btn-secondary-pink'}`}
          onClick={state === 'idle' ? startXYPadRecording : stopXYPadRecording}
        >
          {state === 'idle' ? (
            'Start Recording'
          ) : (
            <>
              {'Stop Recording'} <StopRecording />
            </>
          )}
        </button>
      </div>

      <Tooltip content='This is the XY Pad, your controls for making your tracks come to life. Click the icon to start your performance.'>
        <button
          onClick={() => setXYPad(!enabled)}
          className={`btn-secondary transition-colors flex items-center justify-center absolute mr-[55px] lg:mr-[70px] z-[9] right-4 bottom-4 w-[44px] h-[44px] lg:w-[55px] lg:h-[55px] rounded-full border ${enabled ? 'border-purple-9a bg-purple-9a/50' : ''
            } `}
        >
          <XYPadIcon className='w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]' />
        </button>
      </Tooltip>
    </div>
  );
}

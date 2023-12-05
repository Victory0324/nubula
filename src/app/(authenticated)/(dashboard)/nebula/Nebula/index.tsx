'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import PointCloud from './PointCloud';
import { useStems } from '../providers/stems';
import { useAudioPlayer } from '../providers/audioPlayer';
import { useTour } from '@/app/providers/tour';
import { useKors } from '@/app/providers/kors';
import useCompleteOn3Quest from '@/utils/hooks/quests/on3/useTrackOn3Quest';
import { useAnalytics } from '@/app/providers/analytics';
import OutputTrackNavigationConfirmationModal from './OutputTrackNavigationConfirmationModal';
import { useModal } from '@ebay/nice-modal-react';
import { useOutputTrack } from '@/app/providers/outputTrack';
import HelpTooltip from './PointCloud/HelpTooltip';

const CROSSFADE_DURATION_MS = 250;

export default function Nebula() {
  const confirmationModal = useModal(OutputTrackNavigationConfirmationModal);
  const { selectedKorId } = useKors();
  const completeOn3Quest = useCompleteOn3Quest();
  const [hasSelected, setHasSelected] = useState(false);
  const { track } = useAnalytics();
  const { setOutputTrack, outputTrack, creating } = useOutputTrack();

  const { addStep } = useTour();

  const { waveformRef, setPlaying } = useAudioPlayer();
  const { setSelectedStem } = useStems();

  const sound = useRef<Howl | null>(null);

  useEffect(() => {
    if (creating) sound.current?.fade(1, 0, CROSSFADE_DURATION_MS);
  }, [creating]);

  const onNodeEnter = useCallback(
    (node?: InputStem) => {
      if (!node || creating) return;

      if (waveformRef.current) {
        waveformRef.current.pause();
        setPlaying(false);
      }

      sound.current = new Howl({
        src: [node.audioUrl],
        autoplay: true,
        loop: true,
        html5: true,
        onstop: () => {
          sound.current?.unload();
        },
      });

      track({
        category: 'stem',
        action: 'preview_hover',
        name: node.itemId,
      });
    },
    [creating, waveformRef, track, setPlaying]
  );

  const onNodeLeave = useCallback(() => {
    sound.current?.fade(1, 0, CROSSFADE_DURATION_MS);
  }, []);

  const setActiveStem = useCallback(
    (node?: InputStem) => {
      setSelectedStem((p) => {
        const newStem = p === node ? undefined : node;

        // clear the outputtrack so the stem plays
        setOutputTrack(undefined);

        if (newStem) {
          if (selectedKorId === 'beatkor') {
            completeOn3Quest('PREVIEW_ONE_STEM_WITH_BEATKOR');
          }
          track({
            category: 'stem',
            action: 'preview_click',
            name: newStem.itemId,
          });
        }

        return newStem;
      });

      if (node) setPlaying(true);
    },
    [
      completeOn3Quest,
      selectedKorId,
      setPlaying,
      setSelectedStem,
      track,
      setOutputTrack,
    ]
  );

  const onNodeClick = useCallback(
    (node?: InputStem) => {
      setHasSelected(true);
      sound.current?.stop();

      if (creating) return;

      if (outputTrack && !outputTrack.instanceId) {
        confirmationModal.show({ onConfirm: () => setActiveStem(node) });
      } else setActiveStem(node);
    },
    [confirmationModal, creating, outputTrack, setActiveStem]
  );

  useEffect(() => {
    addStep({
      step: {
        disableBeacon: true,
        target: '#nebula',
        content: (
          <>
            <span className='text-purple-9a'>
              The Sound Nebula is a re-imagined browsing experience
            </span>
            <span className='text-gray-999'>
              {' '}
              to help you find your “dream stem” to create with.
            </span>
          </>
        ),
        title: 'Introducing The Sound Nebula!',
      },
      index: 0,
    });
  }, [addStep]);

  return (
    <div id='nebula' className='w-full h-full'>
      <PointCloud {...{ onNodeEnter, onNodeLeave, onNodeClick }} />
      <div
        className={`absolute bottom-4 left-0 right-0 flex justify-center ${
          hasSelected ? 'hidden' : 'md:hidden'
        }`}
      >
        <HelpTooltip message='Tap star to create' />
      </div>
    </div>
  );
}

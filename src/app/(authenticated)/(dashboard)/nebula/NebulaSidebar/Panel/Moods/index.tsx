import { useCallback, useEffect, useMemo, useState } from 'react';
import Mood from './Mood';
import { getGeneratedLynxTrack } from '@/utils/helpers/lynx';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useRouter } from 'next/navigation';
import { useChat } from '@/app/providers/chat';
import { useCMS } from '@/app/providers/cms';
import { useSFX } from '@/app/providers/sfx';

const Moods = () => {
  const { onTrackCreate, onTrackCreated } = useSFX();
  const { moods } = useCMS();
  const router = useRouter();
  const { send } = useChat();

  const { setCreating, setOutputTrack } = useOutputTrack();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const [randomMoods, setRandomMoods] = useState<string[]>([]);

  const getRandomMoods = useCallback(() => {
    // select 16 random moods
    setRandomMoods(
      moods.sort(() => Math.random() - Math.random()).slice(0, 16)
    );
  }, [moods]);

  useEffect(() => void getRandomMoods(), [getRandomMoods]);

  const onSelect = useCallback((mood: string) => {
    setSelectedMoods((p: string[]) =>
      p.includes(mood) ? p.filter((s) => s !== mood) : [...p, mood]
    );
  }, []);

  const onCreate = useCallback(async () => {
    setCreating(true);
    onTrackCreate();
    router.push('/output');

    await send({
      content: `Make me a song with ${selectedMoods.join(', ')} vibes`,
      onSuccess: (history) => {
        const outputTrack = getGeneratedLynxTrack(history);
        if (outputTrack) {
          onTrackCreated();
          setOutputTrack(outputTrack);
        }
      },
    });

    setCreating(false);
  }, [
    onTrackCreate,
    onTrackCreated,
    router,
    selectedMoods,
    send,
    setCreating,
    setOutputTrack,
  ]);

  return (
    <div className='relative h-full flex flex-col justify-between max-sm:mb-4'>
      <div className='max-h-full overflow-y-scroll mb-[60px] flex flex-wrap gap-3 no-scrollbar'>
        {randomMoods.map((mood) => (
          <Mood
            key={mood}
            isSelected={selectedMoods.includes(mood)}
            {...{ onSelect, mood }}
          />
        ))}
      </div>
      <div className='w-full flex flex-col gap-2 absolute z-10 bottom-0 '>
        <div className='flex justify-end w-full'>
          <button
            onClick={getRandomMoods}
            className='text-sm text-white/50 hover:text-purple-9a transition-colors'
          >
            Refresh
          </button>
        </div>
        {selectedMoods.length ? (
          <div className='flex gap-2 w-full'>
            <button
              className='btn btn-secondary rounded-full grow'
              onClick={() => setSelectedMoods([])}
            >
              Clear
            </button>
            <button
              className='btn btn-primary rounded-full grow'
              onClick={onCreate}
            >
              Create
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Moods;

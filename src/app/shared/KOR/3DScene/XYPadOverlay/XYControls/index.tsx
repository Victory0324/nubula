import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudioXYEffects } from '@/app/providers/audioXYEffects';
import getRelativeMousePosition from '@/utils/helpers/dom/getRelativeMousePosition';
import XYControlsAxes from './Axes';
import FadeInOut from '@/app/shared/Transitions/FadeInOut';

export default function XYControls({ enabled }: { enabled: boolean }) {
  const [dragging, setDragging] = useState(false);
  const { xy, setXy } = useAudioXYEffects();

  const parentRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!parentRef.current) return;

      setDragging(true);

      let { x, y } = getRelativeMousePosition(e, parentRef.current);

      setXy({ x, y });
    },
    [setXy]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || !parentRef.current) return;

      let { x, y } = getRelativeMousePosition(e, parentRef.current);

      // enforce boundaries
      if (x < 0.02) x = 0.02;
      if (x > 0.98) x = 0.98;
      if (y < 0) y = 0;
      if (y > 0.98) y = 0.98;

      setXy({
        x,
        y,
      });

      e.stopPropagation();
      e.preventDefault();
    };

    const onMouseUp = (e: MouseEvent) => {
      setDragging(false);
      setXy({ x: 0.5, y: 0.5 });

      e.stopPropagation();
      e.preventDefault();
    };

    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, parentRef, setDragging, setXy, xy.x, xy.y]);

  return (
    <FadeInOut show={enabled} className={`absolute w-full h-full`}>
      <div
        {...{ onMouseDown }}
        ref={parentRef}
        className={`w-full h-full relative flex justify-center ${
          dragging && 'cursor-grabbing'
        }`}
      >
        <XYControlsAxes />
        <div
          className={`absolute w-4 h-4 bg-purple-9a/50 hover:bg-purple-9a transition-colors rounded-full ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            // magic number to horizontal-center circle
            left: xy.x * 100 - 0.72 + '%',
            top: xy.y * 100 + '%',
          }}
        />
      </div>
    </FadeInOut>
  );
}

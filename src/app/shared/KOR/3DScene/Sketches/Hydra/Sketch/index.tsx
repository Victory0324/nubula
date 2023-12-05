'use client';

import { useEffect, useRef } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import SourceModal from './SourceModal';
import Info from '@/app/(authenticated)/(dashboard)/inventory/assets/Info';

export type HydraSketchProps = {
  parent: HTMLDivElement | null;
  sketch: (synth: any) => void;
  url?: string;
  author?: string;
  title: string;
  audio?: boolean;
};

export default function HydraSketch({
  parent,
  sketch,
  url,
  author,
  title,
  audio = false,
}: HydraSketchProps) {
  const sourceModal = useModal(SourceModal);
  const hydraRef = useRef<any>(null);

  useEffect(() => {
    if (!parent || hydraRef.current) return;

    (async () => {
      const Hydra = (await import('hydra-synth')).default;

      const hydra = new Hydra({
        detectAudio: audio,
        makeGlobal: false,
      });

      const { synth, canvas } = hydra;

      sketch(synth);

      parent?.appendChild(canvas);

      hydraRef.current = hydra;

      url && console.info('Source:', url);
      author && console.info('Author:', author);
    })();

    return () => {
      parent?.removeChild(hydraRef.current?.canvas);
      hydraRef.current?.synth.hush();
      hydraRef.current = null;
    };
  }, [author, sketch, parent, url, audio]);

  return (
    <div className='absolute top-0 left-0 m-4 z-10'>
      <Info
        className='hover-purple hover:cursor-pointer'
        onClick={() => sourceModal.show({ sketch, url, author, name: title })}
      />
    </div>
  );
}

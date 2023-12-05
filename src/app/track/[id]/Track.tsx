import useGetOutputTrack from '@/utils/hooks/outputTrack/getOutputTrack';
import extractColors from 'extract-colors';
import { Link } from '@/app/providers/router';
import Image from 'next/image';
import Gradient from '@/app/shared/Gradient';
import { useEffect, useState } from 'react';
import SimpleAudioPlayer from '@/app/shared/AudioPlayer/Simple';
import Loading from '@/app/shared/assets/Loading';

export default function Track({ id }: { id: string }) {
  const { outputTrack, loading } = useGetOutputTrack({ id });
  const [colors, setColors] = useState<string[]>();

  useEffect(() => {
    (async () => {
      if (outputTrack?.artworkImageUrl) {
        try {
          const palette = await extractColors(
            // This cache bust prop is needed to ensure the browser
            // loads a uncached image with the cross-origin anon
            // param.
            outputTrack.artworkImageUrl + '?cache-bust',
            {
              crossOrigin: 'anonymous',
            }
          );

          // filter out any dark black/grays
          setColors(palette.filter((p) => p.lightness > 0.3).map((c) => c.hex));
        } catch (err) {
          console.error('error extracting colors', err);
        }
      }
    })();
  }, [outputTrack?.artworkImageUrl]);

  if (loading) {
    return (
      <div className='w-full flex justify-center'>
        <Loading />
      </div>
    );
  }

  if (!outputTrack) {
    return <div>Something went wrong</div>;
  }

  return (
    <Gradient colors={colors}>
      <div className='text-center'>
        {outputTrack.artworkImageUrl && (
          <Image
            className='mb-8 rounded-xl'
            alt={`Album art for ${
              outputTrack.name || outputTrack.generatedTrackName
            }`}
            width='510'
            height='510'
            src={outputTrack.artworkImageUrl}
          />
        )}
        <h2 className='text-xl font-bold'>
          {outputTrack.name || outputTrack.generatedTrackName}
        </h2>
        <p className='mb-4'>{outputTrack.artists?.join(',')}</p>
        <div className='my-8'>
          <SimpleAudioPlayer track={outputTrack} />
        </div>
        <Link href='/'>
          <button
            className='btn
            rounded-tl-2xl
            rounded-tr-3xl
            rounded-br-2xl
            font-bold

            px-5 py-2.5 grow shrink-0
            text-black bg-white  hover:bg-white/75 transition-colors'
          >
            Create Your Own
          </button>
        </Link>
      </div>
    </Gradient>
  );
}

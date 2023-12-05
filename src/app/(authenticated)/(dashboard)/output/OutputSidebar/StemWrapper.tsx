import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import Music from '@/app/shared/assets/Music';

interface StemWrapperProps {
  stem: OutputTrackStem;
}

const StemWrapper = ({ stem }: StemWrapperProps) => {
  const { setSelectedOutputStem, selectedOutputStem } = useStems();
  return (
    <div
      className={`
        border border-t-0 border-gray-42
        py-4 px-4
        font-bold flex
        capitalize
        hover:cursor-pointer

        ${selectedOutputStem === stem ? 'opacity-100' : 'opacity-80'}
        hover:opacity-100
      `}
      onClick={() => {
        setSelectedOutputStem(stem);
      }}
    >
      <Music />
      <span className='ms-4'>{stem.category}</span>
    </div>
  );
};

export default StemWrapper;

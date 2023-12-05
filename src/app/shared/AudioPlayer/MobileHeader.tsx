import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useOutputTrack } from '@/app/providers/outputTrack';

const MobileHeader = () => {
  const { setSelectedStem } = useStems();
  const { setOutputTrack } = useOutputTrack();

  return (
    <div className='lg:hidden flex justify-between mx-5 items-center mt-4'>
      <div
        onClick={() => {
          setSelectedStem(undefined);
          setOutputTrack(undefined);
        }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16 5L16 7L14 7L14 5L16 5ZM12 9L12 7L14 7L14 9L12 9ZM10 11L10 9L12 9L12 11L10 11ZM10 13L8 13L8 11L10 11L10 13ZM12 15L12 13L10 13L10 15L12 15ZM12 15L14 15L14 17L12 17L12 15ZM16 19L16 17L14 17L14 19L16 19Z'
            fill='white'
          />
        </svg>
      </div>
      <div className='text-sm text-gray-999'>SELECTED STEM</div>
      <div> </div>
    </div>
  );
};

export default MobileHeader;

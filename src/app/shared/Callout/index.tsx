import KorusLogo from '../assets/KorusLogo';
import Link from 'next/link';

const Callout = ({ itemType = 'video' }) => {
  return (
    <div className='flex w-full items-center bg-gray-10 border-b-white/10 p-4 justify-center border-b'>
      <div className='w-4/5 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <KorusLogo />
          <div>
            <h3 className='font-bold'>Create your own {itemType}</h3>
            <p className='text-xs text-gray-400'>
              Sign up to create tracks, videos and playlists.
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button className='cursor-pointer btn btn-secondary rounded-full'>
            <Link href='/'>Sign Up</Link>
          </button>
          <button className='cursor-pointer btn btn-primary rounded-full'>
            <Link href='/'>Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Callout;

import Tick from './assets/Tick';
import Warning from './assets/Warning';

export default function Toast({ type, title, body }: Toast) {
  return (
    <div className='border rounded-xl rounded-tl-none border-gray-999 p-4 pr-6 flex items-center gap-4 backdrop-blur bg-gray-1e'>
      {type === 'success' ? (
        <Tick className='text-purple-9a' />
      ) : (
        <Warning className='text-red-warning' />
      )}
      <div className={'flex flex-col font-[15px] '}>
        {title && (
          <div
            className={`${
              type === 'success' ? 'text-purple-9a' : 'text-red-warning'
            }`}
          >
            {title}
          </div>
        )}
        {body}
      </div>
    </div>
  );
}

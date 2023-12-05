export default function FreeTrackCount({ count }: { count: number }) {
  return (
    <div className='flex justify-between items-center m-2 border border-white rounded-xl p-2 bg-white bg-opacity-10'>
      <div className='flex-grow'>
        <h2 className='text-base text-center font-bold uppercase'>free</h2>
      </div>
      <div className='border border-white rounded-xl px-1.5 py-1'>
        <span className={count === 10 ? 'text-rose-500' : 'text-purple-9a'}>
          {count}
        </span>
      </div>
    </div>
  );
}

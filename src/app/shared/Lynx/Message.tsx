import { useOutputTrack } from '@/app/providers/outputTrack';
import ChatIcon from '../assets/Chat';
import UserIcon from '../assets/User';
import Toast from '../Toasts/Toast';
import { toast } from 'react-toastify';
import Play from '@/app/shared/assets/Play';
import { useRouter } from '@/app/providers/router';

function Attachment({ type, payload }: LynxAttachment) {
  const { setOutputTrack } = useOutputTrack();
  const router = useRouter();

  if (type !== 'audio/mp3') {
    return;
  }

  return (
    <div className='py-2'>
      <button
        onClick={async () => {
          try {
            setOutputTrack(JSON.parse(payload));
            router.push('/output');
          } catch (error) {
            let message = 'Unknown Error';
            if (error instanceof Error) message = error.message;
            toast(
              <Toast type='error' title='Something went wrong' body={message} />
            );
          }
        }}
        className='
          btn
          flex
          gap-2
          justify-center
          items-center
          rounded-tl-2xl
          rounded-tr-3xl
          rounded-bl-2xl
          font-bold
          w-full
          px-5 py-2.5 grow shrink-0
          text-black 
          bg-white  
          hover:bg-white/75 
          transition-colors'
      >
        <Play />
        Check Track
      </button>
    </div>
  );
}

function UserMessage({ content }: LynxHistoryItem) {
  return (
    <div className='flex gap-2 items-end justify-center'>
      <p className='flex-grow rounded-xl px-4 py-2 my-2 backdrop-blur border bg-white bg-opacity-20'>
        {content}
      </p>
      <div className='rounded-full p-2 my-2 backdrop-blur border flex justify-center items-center'>
        <UserIcon className='w-[16px] h-[19px]' />
      </div>
    </div>
  );
}

function ServerMessage({ content, attachments }: LynxHistoryItem) {
  return (
    <div>
      <div className='flex gap-2 items-end justify-center'>
        <div className='rounded-full p-2 my-2 backdrop-blur border'>
          <ChatIcon className='w-[19px] h-[19px]' />
        </div>
        <p className='flex-grow rounded-xl px-4 py-2 my-2 backdrop-blur border'>
          {content}
        </p>
      </div>
      {attachments &&
        attachments.map((attachment, i) => {
          return <Attachment key={i} {...attachment} />;
        })}
    </div>
  );
}

export default function Message(message: LynxHistoryItem) {
  if (message.role === 'user') {
    return <UserMessage {...message} />;
  }

  return <ServerMessage {...message} />;
}

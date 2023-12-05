import { useState, useRef, useEffect, useMemo } from 'react';
import ChatIcon from '../assets/ChatEllipse';
import Message from './Message';
import Header from './Header';
import Spinner from './Spinner';
import Input from './Input';
import TutorialMessage from './Tutorial/Message';
import TutorialModal from './Tutorial/Modal';
import Tooltip from '../Tooltips/Tooltip';
import { useChat } from '@/app/providers/chat';

export default function Lynx() {
  const { send, history, loading } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  }, [history.length, isOpen]);

  const messages = useMemo(
    () =>
      history
        .filter((h) => !h.hidden)
        .slice(-10)
        .map((h, i) => (
          <li key={h.content + i}>
            <Message {...h} />
          </li>
        )),
    [history]
  );

  return (
    <>
      <div className='absolute right-4 bottom-[40px] z-[9] w-[44px] h-[44px] lg:w-[55px] lg:h-[55px]'>
        <Tooltip content='This is Lynx, your AI powered chat companion. Click the icon to interact with Lynx.'>
          <button
            onClick={() => {
              setIsOpen((o) => !o);
            }}
            className='btn-secondary rounded-full w-full h-full flex items-center justify-center'
          >
            <ChatIcon
              className='
              m-3
              w-[18px] h-[18px]
              lg:w-[28px] lg:h-[28px]'
            />
          </button>
        </Tooltip>
        <div className='relative'>
          {isOpen && (
            <div className='fixed lg:absolute right-0 left-0 top-[50px] lg:top-unset md:left-auto md:right-4 bottom-4 sm:w-full md:w-[390px] max-h-[640px] backdrop-blur p-4 rounded-xl border border-white flex flex-col lg:min-h-[400px] mx-5'>
              <Header close={() => setIsOpen(false)} />
              <div className='mt-4 overflow-y overflow-auto no-scrollbar grow'>
                <ul>
                  {messages.length ? (
                    messages
                  ) : (
                    <TutorialMessage {...{ showTutorial, setShowTutorial }} />
                  )}
                </ul>
                <div ref={messagesEndRef} />
              </div>
              {loading && (
                <div className='flex items-center justify-center p-4'>
                  <Spinner />
                </div>
              )}
              <Input onSubmit={(m) => send({ content: m })} />
            </div>
          )}
        </div>
      </div>
      <TutorialModal
        shown={showTutorial}
        close={() => setShowTutorial(false)}
      />
    </>
  );
}

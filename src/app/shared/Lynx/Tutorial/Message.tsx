import Message from '../Message';

export default function TutorialMessage({
  showTutorial,
  setShowTutorial,
}: {
  showTutorial: boolean;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Message
        role='assistant'
        content={
          <>
            <p>Hey, I&apos;m Lynx!</p>
            <p>
              I am your new <span className='text-purple-9a'>AI companion</span>
              . I love making music and work with the prompts you give me.
            </p>
          </>
        }
        hidden={false}
      />
      <Message
        role='assistant'
        content={
          <button onClick={() => setShowTutorial(true)}>
            <p>
              Want a <span className='text-purple-9a'>tutorial</span>? Click
              here if so!
            </p>
          </button>
        }
        hidden={false}
      />
    </>
  );
}

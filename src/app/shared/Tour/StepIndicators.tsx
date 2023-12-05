import DownArrow from '../assets/DownArrow';

export default function StepIndicators({
  currentStepIndex,
  numSteps,
  setCurrentStepIndex,
  onEnd,
}: {
  currentStepIndex: number;
  numSteps: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  onEnd: Function;
}) {
  return (
    <div className='flex mt-4 items-center gap-4'>
      {currentStepIndex > 0 && (
        <button
          className='rounded-lg border bg-gray-999/25 border-purple-9a flex items-center justify-center'
          onClick={() => setCurrentStepIndex((p) => p - 1)}
        >
          <DownArrow className='rotate-90 w-6 h-6' />
        </button>
      )}
      <div className='flex items-center gap-2'>
        {Array.from({ length: numSteps }).map((_, index) => (
          <button
            onClick={() => setCurrentStepIndex(index)}
            key={index}
            className={`hover:bg-purple-9a transition-colors ${
              index === currentStepIndex
                ? 'w-[8px] h-[8px] bg-white'
                : 'w-[4px] h-[4px] bg-gray-999'
            }`}
          ></button>
        ))}
      </div>
      <button
        className='rounded-lg border bg-gray-999/25 border-purple-9a flex items-center justify-center'
        onClick={() => {
          currentStepIndex < numSteps - 1
            ? setCurrentStepIndex((p) => p + 1)
            : onEnd();
        }}
      >
        {currentStepIndex < numSteps - 1 ? (
          <DownArrow className='-rotate-90 w-6 h-6' />
        ) : (
          <span className='mx-2'>Finish</span>
        )}
      </button>
    </div>
  );
}

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className='flex w-full justify-between mb-10'>
      <div
        className={`
          flex
          w-1/3
          me-1
          ms-7

          border-b-2
          border-gray-4a
          ${step >= 1 && 'border-orange-light'} `}
      />
      <div
        className={`
          flex
          w-1/3
          me-1

          border-b-2
          border-gray-4a
          ${step >= 2 && 'border-orange-light'} `}
      />
      <div
        className={`
          w-1/3
          me-7

          border-b-2
          border-gray-4a
          ${step >= 3 && 'border-orange-light'}
          `}
      />
    </div>
  );
};

export default ProgressBar;

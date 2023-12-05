import { useState } from 'react';

interface StyledRangeProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
}

const StyledRange: React.FC<StyledRangeProps> = ({
  min,
  max,
  step,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type='range'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleSliderChange}
      className='accent-white'
    />
  );
};

export default StyledRange;

import { kebabCase } from 'lodash';
import TickBoxFill from '../assets/TickBoxFill';
import TickBoxEmpty from '../assets/TickBoxEmpty';

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

interface StyledRadioInputProps
  extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledRadioInput = ({
  label,
  value,
  onChange,
  checked,
}: StyledRadioInputProps) => {
  const elId = kebabCase(label);

  return (
    <>
      <input
        id={elId}
        type='radio'
        value={value}
        name='inline-radio-group'
        className='hidden peer'
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={elId}
        className='text-sm font-medium text-gray-300 hidden peer-checked:flex items-center gap-1 cursor-pointer'
      >
        <Selected />
        {label}
      </label>
      <label
        htmlFor={elId}
        className='flex text-sm font-medium text-gray-300 peer-checked:hidden items-center gap-1 cursor-pointer'
      >
        <Unselected />
        {label}
      </label>
    </>
  );
};

const StyledRadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <>
      {options.map((option) => (
        <div key={option.value} className='flex items-center'>
          <StyledRadioInput
            label={option.label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
          />
        </div>
      ))}
    </>
  );
};

const Unselected = () => <TickBoxEmpty />;

const Selected = () => <TickBoxFill className='text-purple-9a' />;

export default StyledRadioGroup;

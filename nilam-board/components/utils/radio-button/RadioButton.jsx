import { useState } from 'react';

const RadioButton = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <label className='p-2'  key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            className='px-2'
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
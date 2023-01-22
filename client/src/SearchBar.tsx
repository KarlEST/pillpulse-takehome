/* eslint-disable no-console */
import { Dispatch, SetStateAction } from 'react';
import Select, { Options } from 'react-select';

interface DrugOption {
  label: string;
  value: string;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla1', label: 'Vanilla1' },
  { value: 'vanilla2', label: 'Vanilla2' },
  { value: 'vanilla3', label: 'Vanilla3' },
  { value: 'vanilla4', label: 'Vanilla4' },
];

interface SearchBarProps {
  setMessage: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setMessage }: SearchBarProps) => {
  return (
    <Select
      isMulti
      options={options}
      onChange={(options) => handleOnChange(options, setMessage)}
      isOptionDisabled={(_selectedOption, selectedOptions) => selectedOptions?.length >= 5}
    />
  );
};

const handleOnChange = (
  options: Options<DrugOption>,
  setMessage: Dispatch<SetStateAction<string>>,
) => {
  if (options?.length <= 1) {
    setMessage('Add at least 2 medications');
  } else {
    setMessage('Result is fire');
  }
};

export default SearchBar;

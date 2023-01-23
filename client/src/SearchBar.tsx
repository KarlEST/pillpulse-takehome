import Select, { Options } from 'react-select';

import { DrugOption } from './types';

import './SearchBar.css';

interface SearchBarProps {
  options: DrugOption[];
  onChange: (options: Options<DrugOption>) => Promise<void>;
  isLoading: boolean;
}

const SearchBar = ({ onChange, options, isLoading }: SearchBarProps) => {
  return (
    <div className="SearchBar">
      <Select
        isMulti
        options={options}
        isLoading={isLoading}
        onChange={onChange}
        isOptionDisabled={(_selectedOption, selectedOptions) =>
          selectedOptions?.length >= 5 || isLoading
        }
      />
    </div>
  );
};

export default SearchBar;

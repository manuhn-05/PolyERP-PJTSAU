import React from 'react';
import Select from 'react-select'

type SelectOption = {
    value: string;
    label: string;
}
type SelectDropdownProps = {
options: SelectOption[];
handleSelectOption: (option: SelectOption) => void;
selectedOption: SelectOption | null;
placeHolder ?: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({options, handleSelectOption, selectedOption, placeHolder}) => {
  return (
    <div>
         <Select
        options={options} // Pass the defined options
        onChange={(selectedOption) => handleSelectOption(selectedOption as SelectOption)} // Update state on selection change
        value={selectedOption} // Control the selected value
        placeholder={`${placeHolder} || Select an option`} // Optional placeholder text
      />
    </div>
  )
}

export default SelectDropdown
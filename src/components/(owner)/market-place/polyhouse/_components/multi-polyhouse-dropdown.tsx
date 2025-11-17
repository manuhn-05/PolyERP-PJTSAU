import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useFetchPolyhousesList } from '@/data-handling/queries/market-place-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useTheme } from 'next-themes';
import React, {  useMemo } from 'react';
import Select from 'react-select';


type PolyhousesDropdownProps = {
    selectedPolyhouse : any,
    handleSelectOption : (selectedOption : any) => void,
    placeHolder : string,
    className?: string,
}

const PolyhousesDropdownMultiSelect : React.FC<PolyhousesDropdownProps> = ({handleSelectOption, placeHolder, selectedPolyhouse, className}) => {
  const {currentUser, isAuthenticated} = useAppSelector(state => state.user);

    const {data : polyhousesList, } = useFetchPolyhousesList(`${currentUser?._id}`,Boolean(currentUser && isAuthenticated));

    const { theme } = useTheme();
    const isDarkMode = theme === "dark";


    const listOfPolyhouses = useMemo(() => polyhousesList?.data?.map((polyhouse : any) => ({label : polyhouse?.polyhouse_name, value : polyhouse?._id})), [polyhousesList?.data]);
  return (
    <div className={`${className || ""}`}>
         <Select
         isMulti
         className='border rounded-lg'
         styles={SELECT_COMPONENT_STYLES(isDarkMode)}
        options={listOfPolyhouses} // Pass the defined options
        onChange={(selectedOption) => handleSelectOption(selectedOption )} // Update state on selection change
        value={selectedPolyhouse} // Control the selected value
        placeholder={`${placeHolder || "Select a polyhouse"}`} // Optional placeholder text
      />
    </div>
  )
}

export default PolyhousesDropdownMultiSelect;
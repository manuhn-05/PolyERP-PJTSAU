import { Box,  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ADD_SUPPLIER_DROPDOWN_OPTIONS } from '@/constants/dummy-modules'; 
import { SELECT_COMPONENT_STYLES } from '@/constants/styles';
import { useTheme } from 'next-themes';

const FormSelect = ({
  
  onChangeHandler,
  loadDropDownData, 
  placeHolder,
  labelValue,
  id,
  name,
  
} : any) => {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [supplier_supplied_products, setSupplier_supplied_products] = useState([]);
  const dropdownData = (name==='supplier_supplied_products' && supplier_supplied_products)|| getDropdownOptions(name);

  return (
    <Box className='mb-[0.5em]'>
      <label htmlFor={`${id}`} className=''>
        {labelValue} 
      </label>
      <Select
        styles={SELECT_COMPONENT_STYLES(isDarkMode)}
        className='border rounded-lg'
        options={dropdownData}
        isClearable
        isSearchable
        id={`${id}`}
        name={name}
        onChange={onChangeHandler}
        placeholder={placeHolder}

      />
    </Box>
  );
};

export default FormSelect;



// Utility function to get dropdown options based on the name
const getDropdownOptions = (name : any ) => {
 
      return ADD_SUPPLIER_DROPDOWN_OPTIONS?.[`${name}`];
    
};

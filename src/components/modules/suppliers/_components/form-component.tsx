import { Box, FormControl, FormErrorMessage, FormLabel, Input, Switch, Textarea, } from '@chakra-ui/react';

import React from 'react'
import FormSelect from './form-select'

type FormComponentProps = {
    supplierFormData: any[],
    onDropDownChangeHandler: (e: any) => void,
    selectedValue: any,
    loadDropDownData: (e: any) => void,
    onInputsChangeHandler: (e: any) => void,
    handleChange: (e: any) => void,
    formData: any,
    values : any,
    errors?: any,
    touched?: any,
    handleBlur?: any
    handleReset?: any
}

const FormComponent: React.FC<FormComponentProps> = ({ supplierFormData,   onDropDownChangeHandler,
    selectedValue, loadDropDownData, onInputsChangeHandler,  handleChange,   formData, values }) => {


    function switchComponent(fieldData : any) {
        switch (fieldData.type) {
            case 'text':
            case 'date':
            case 'email':
            case 'number':
                return <Box className=''>
                    <Input type={fieldData?.type} value={values[fieldData?.name]}
                        onChange={handleChange} placeholder={fieldData?.placeholder} 
                        name={fieldData?.name} id={fieldData?.id} />
                </Box>;
            case 'checkbox': return <Box>
                <Switch
                    id={fieldData?.id}
                    isChecked={values[fieldData?.name]}
                    onChange={handleChange}
                />
            </Box>;
            case 'file':
                return (
                <Box>
                    <Input type={fieldData?.type} value={values?.[fieldData?.name]} onChange={onInputsChangeHandler} name={fieldData?.name} id={fieldData?.id} />
                </Box>)
            case 'dropdown':
                return (
                    <FormSelect
                        {...fieldData}
                        formData={formData}
                        selectedValue={values?.[fieldData?.name]}
                        onChangeHandler={onDropDownChangeHandler}
                        loadDropDownData={loadDropDownData}
                        name={fieldData?.name} id={fieldData?.name}
                    />
                );
            case 'textarea':
                return <Textarea {...fieldData} value={fieldData.value} onChange={onInputsChangeHandler} />;
            default:
                return null;
        }
    }


    return (
        <Box className="w-full md:grid grid-cols-2 gap-[0.75%]">
            {supplierFormData?.map((fieldData : any, index) => (

                <FormControl key={index} mb={4} >
                    <FormLabel>{fieldData?.label}</FormLabel>
                    {switchComponent(fieldData)}

                  
                </FormControl>
            ))}
        </Box>
    )
}

export default FormComponent;
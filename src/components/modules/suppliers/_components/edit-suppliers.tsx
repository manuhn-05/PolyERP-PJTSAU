import React, { useState } from 'react'
import SupplierFormComponent from '@/components/modules/suppliers/_components/supplier-form-component';

type Props = {
    item : any
}

const EditSupplierDetails = ({item}: Props) => {
    const [formData, setFormData] = useState({...item});
    console.log(item)
      function onDropDownChangeHandler(selectedOption: any) {
    
        setFormData((prev: any) => {
          const id = selectedOption?.id.split('-')[0];
          const value = selectedOption?.value;
          return {
            ...prev,
            [id]: value
          }
        })
      }
      function onInputFieldsChangeHandler(e: any) {
        const { id, name, type, value, checked, files } = e.target;
        const key = id || name;
      
        setFormData((prev: any) => ({
          ...prev,
          [key]: type === "checkbox" ? checked 
                : type === "file" ? files?.[0] 
                : value
        }));
      }
    
    
      function handleChange(e: any) {
        const { id, name, type, value, checked, files } = e.target;
        const key = id || name;
      
        setFormData((prev: any) => ({
          ...prev,
          [key]: type === "checkbox" ? checked 
                : type === "file" ? files?.[0] 
                : value
        }));
      }
      
      async function handleFormSubmit(data : any){
        console.log(data)
      }
  return (
    <div>
         <SupplierFormComponent handleChange={handleChange} initialValues={formData} handleFormSubmit={(data:any)=>handleFormSubmit(data)}
        onDropDownChangeHandler={onDropDownChangeHandler} onInputFieldsChangeHandler={onInputFieldsChangeHandler} />
    </div>
  )
}

export default EditSupplierDetails
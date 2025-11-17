"use client";
import React, { useRef, useState } from 'react';
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import { IoIosOpen } from "react-icons/io";
import { RiCloseCircleFill } from "react-icons/ri";

import SupplierFormComponent from '@/components/modules/suppliers/_components/supplier-form-component';
import { useCreateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';


const AddNewSupplier = () => {
const {selectedPolyhouse} = useAppSelector((store)=>store?.polyhouse);
const {currentUser} = useAppSelector((store)=>store?.user);
const queryClient = useQueryClient();
const modalRef=useRef<ModalWindowRef>(null);


  const {mutateAsync : addSuppliersToList} = useCreateDataAsPerEndpoint('suppliers');
  const [formData, setFormData] = useState({
    supplier_category: '',
    supplier_time_zone: '',
    supplier_currency: "",
    supplier_country: '',
    supplier_payment_terms: '',
    supplier_supplied_products: '',
    supplier_product_categories: [],
    supplier_delivery_mode: '',
    supplier_agreement_type: '',
    supplier_risk_level: '',
    expected_delivery_in_days: '',
  });

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
const updated_data = {
  ...data, polyhouse_id :`${selectedPolyhouse?.value}`, added_by : `${currentUser?._id}`
}
try {
  const response = await addSuppliersToList(updated_data);
     if(response?.status === HTTP_RESPONSE_CODES.CREATED){
        queryClient.invalidateQueries({queryKey : ['suppliers']});
        modalRef.current?.closeModal();
      }
} catch (error) {
  console.log(error)
}
  }
  return (
    <section>
      <ModalWindow
      ref={modalRef}
      // todo : Enable for PolyERP
      isOpenDisabled={true}
        OpenComponent={IoIosOpen}
        CloseComponent={RiCloseCircleFill}
        title="Add New Supplier"
        isItButton={true} buttonText={`Add New Supplier`}
        bothIconAndNameNeeded={false}
        openButtonClassName={`text-white`}
        modalClassName={`md:w-[60%] md:h-[75dvh] overflow-y-auto bg-white dark:bg-[#122031]`}
      >

        <SupplierFormComponent handleChange={handleChange} initialValues={formData} handleFormSubmit={(data:any)=>handleFormSubmit(data)}
        onDropDownChangeHandler={onDropDownChangeHandler} onInputFieldsChangeHandler={onInputFieldsChangeHandler} />
      </ModalWindow>

    </section>
  )
}

export default AddNewSupplier
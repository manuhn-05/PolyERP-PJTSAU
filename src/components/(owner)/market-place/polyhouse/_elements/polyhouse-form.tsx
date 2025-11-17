
import { useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@chakra-ui/react";
import React from 'react';

import {  POLYHOUSE_SCHEMA, POLYHOUSE_SCHEMA_FORM_TYPE, REGISTER_NEW_POLYHOUSE_LIST } from '@/constants/polyhouse';


type PolyhouseCreateEditFormProps = {
    handleFormSubmit : (data : POLYHOUSE_SCHEMA_FORM_TYPE) => void
    INITIAL_VALUES :POLYHOUSE_SCHEMA_FORM_TYPE,
    submitButtonText : string,
}

const PolyhouseCreateEditForm: React.FC<PolyhouseCreateEditFormProps> = ({handleFormSubmit, INITIAL_VALUES, submitButtonText}) => {
    const {register, handleSubmit, formState : {errors}} = useForm<POLYHOUSE_SCHEMA_FORM_TYPE>({
        resolver : zodResolver(POLYHOUSE_SCHEMA),
        defaultValues : {...INITIAL_VALUES},
    mode : "onTouched",
    });
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='md:text-[0.65m] lg:text-[0.4em] z-[9999]'>
          <section className='grid md:grid-cols-2 gap-[2%] h-[80%]'>
            {
              REGISTER_NEW_POLYHOUSE_LIST?.map((item) => {
                const fieldName = `${item?.name}` as keyof POLYHOUSE_SCHEMA_FORM_TYPE
                return (
                  (
                    <div key={item?.name}>
                      {
                        item?.type === "file" ? 
                        (<div>
                           <label htmlFor={`${item?.name}`}>{item.label}</label>
                       <div>
                       <Input
                            className="border-none outline-none ring-0 focus:ring-0"
                            {...register(fieldName)}
                            name={item.name}

                            type={item.type}
                            placeholder={item.placeholder}
                            required={item.required}
                          />
                       </div>
                        </div>) 
                        :
                         (
                          <div className="my-[2%]">
                        <label htmlFor={`${item?.name}`}>{item.label}</label>
                        <div className={`flex items-center ${item.type === "password" ? "relative" : ""}`}>
                          <Input
                            className="border-none outline-none ring-0 focus:ring-0"
                            {...register(fieldName)}
                            name={item.name}

                            type={item.type}
                            placeholder={item.placeholder}
                            required={item.required}
                          />

                        </div>
                        {errors?.[fieldName] && <p className="text-red-500 md:text-[0.8em]">{errors?.[fieldName]?.message}</p>}
                      </div>
                        )
                      }
                    </div>
                  )
                )
              })
            }
          </section>
          <div className='max-md:mt-[28%] md:my-[3%] flex justify-end w-[90%] mx-auto'>
            <Button color={'white'} bg={'#6BBBE9'} _hover={{ bg: "#6BBBE9" }} type='submit'>{submitButtonText}</Button>
          </div>
        </form>
  )
}

export default PolyhouseCreateEditForm
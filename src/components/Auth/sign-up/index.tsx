"use client";
import Link from 'next/link'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGNUP_FORM_INITIAL_VALUES, USER_REGISTER_CONSTS_ARRAY, USER_SIGNUP_FORM_TYPE, USER_SIGNUP_SCHEMA } from '@/constants/auth-consts';
import { Button, Input } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import {  useUserSignUpWithDetails } from '@/data-handling/queries/auth-queries';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';


const SignUpUser = () => {

    const {register, handleSubmit,  control,
        watch, formState : {errors}} = useForm<USER_SIGNUP_FORM_TYPE>({
        resolver : zodResolver(USER_SIGNUP_SCHEMA),
        defaultValues : {...SIGNUP_FORM_INITIAL_VALUES},
    mode : "onTouched",
    });
    const {mutateAsync : userSignUpWithDetails} = useUserSignUpWithDetails()
    const router = useRouter();
    // const selectedCountry = watch("country"); // value from form
    // const selectedState = watch("state");

    // const {data : countries} = useFetchCountriesList();
    // const {data : states} = useFetchStatesList(`${selectedCountry?.value}` as string);
    // const {data : districts} = useFetchDistrictsList(`${selectedState?.value}` as string);

    async function handleFormSubmit(data : USER_SIGNUP_FORM_TYPE){
        try {
            const res = await userSignUpWithDetails({...data, user_type : "owner"});
            if (res?.status === HTTP_RESPONSE_CODES?.OK) {
              router.push("/dashboard");
            }
          }
          catch (err: any) {

            console.log(err);
          }
    }
  return (
    <section>
         <div>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
       <section className='grid md:grid-cols-2 gap-[2%]'>
       {
                USER_REGISTER_CONSTS_ARRAY?.map((item)=>{
                    const fieldName = `${item?.name}` as keyof USER_SIGNUP_FORM_TYPE
                    return(<div key={item.name}>
                           <div  className="my-[2%]">
                        <label htmlFor={`${item?.name}`}>{item.label}</label>
                        <div className={`flex items-center ${item.type === "password" ? "relative" : ""}`}>
                        <Input
                        className="border-none outline-none ring-0 focus:ring-0"
                          {...register(fieldName)}
                          name={item.name}
            
                          type={ item.type}
                          placeholder={item.placeholder}
                          required={item.required}
                        />
                       
                        </div>
                        {errors?.[fieldName] && <p className="text-red-500 md:text-[0.8em]">{errors?.[fieldName]?.message}</p>}
                      </div>
                  {/* {
                    item?.type==='select' ? (
                    <div>
 <Controller
                      control={control}
                      name={fieldName}
                      render={({ field }) => {
                        let options: { label: string; value: string }[] = [];

                        if (item.name === "country") options = countries ?? [];
                        if (item.name === "state") options = states ?? [];
                        if (item.name === "district") options = districts ?? [];

                        return (
                          <div className="my-[2%]">
                            <label htmlFor={item.name}>{item.label}</label>
                            <Select
                            {...field}
                            options={options}
                            isDisabled={
                              (item.name === "state" && !selectedCountry) ||
                              (item.name === "district" && !selectedState)
                            }
                            placeholder={`${item.placeholder}`}
                            onChange={(val) => field.onChange(val)} // store value only
                          />
                          </div>
                        );
                      }}
                    />
                    {errors?.[fieldName] && (
                      <p className="text-red-500 md:text-[0.8em]">
                        {errors?.[fieldName]?.message}
                      </p>
                    )}                        
                    </div>
                
                )
                    :
                    (
                     
                    )
                  } */}
                    </div>)
                })
            }
       </section>
       <div className='md:w-[70%] mx-auto my-[3%] flex justify-end items-center'>
       <Button variant={"solid"} bg={"#6BBBE9"} _hover={{ bg: "#6BBBE9" }}  className="hover:bg-opacity-90" type="submit">Sign In</Button>
       </div>
          </form>
          <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
      </div>
    </section>
  )
}

export default SignUpUser;
"use client";
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { POLYHOUSE_INITIAL_VALUES,  POLYHOUSE_SCHEMA_FORM_TYPE,  } from '@/constants/polyhouse';
import { useRegisterNewPolyhouse } from '@/data-handling/queries/market-place-queries';
import { useQueryClient } from '@tanstack/react-query';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import PolyhouseCreateEditForm from '@/components/(owner)/market-place/polyhouse/_elements/polyhouse-form';
import { Text,Box } from "@chakra-ui/react"
import { useTranslation } from 'react-i18next';
import { LANGUAGE_JSON_KEYS } from '@/constants/language-consts';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';

const LinkNewPolyhouse = () => {
const {mutateAsync : registerNewPolyhouse} = useRegisterNewPolyhouse();
const queryClient = useQueryClient();
const modalRef = useRef<ModalWindowRef>(null);
const { t,  } = useTranslation("common");
const  user= useAppSelector(state => state.user.currentUser);

 

  async function handleFormSubmit(data : POLYHOUSE_SCHEMA_FORM_TYPE){
    try {

      const results = await registerNewPolyhouse({...data, user_id : `${user?._id}`});

      if(results?.status===HTTP_RESPONSE_CODES.CREATED){
        modalRef.current?.closeModal();
        queryClient.invalidateQueries({queryKey : ['polyhouses_list']});
    

       }
      }
      catch (err: any) {

        console.log(err);
      }
}
  return (
    <Box className='flex justify-between items-center md:w-[90%] mx-auto p-[1%]'>
        <Text className='font-semibold md:text-[0.8em]' as={'h3'}>{t(`${LANGUAGE_JSON_KEYS?.MY_POLYHOUSES}`)}</Text>
        <ModalWindow isItButton={true} buttonText={t(`${LANGUAGE_JSON_KEYS?.LINK_POLYHOUSE}`)} buttonClasses={'bg-[#6BBBE9] text-white'}
      OpenComponent={IoMdCloseCircle} title={'Link New Polyhouse'}
      modalClassName='max-md:h-[75dvh] max-md:overflow-y-scroll md:w-[60%] dark:bg-[#122031] mt-[7%]'
      CloseComponent={IoMdCloseCircle} closeButtonClassName='text-red-500 lg:text-[0.7em]'
      ref={modalRef} isOpenDisabled={true}
    >
      <>
      <PolyhouseCreateEditForm submitButtonText={'Register'} handleFormSubmit={handleFormSubmit} INITIAL_VALUES={POLYHOUSE_INITIAL_VALUES} />
      </>
    </ModalWindow>
      </Box>
   
  )
}

export default LinkNewPolyhouse;
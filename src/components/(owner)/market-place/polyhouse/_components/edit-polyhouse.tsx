

import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import {  POLYHOUSE_SCHEMA_FORM_TYPE, } from '@/constants/polyhouse';
import { BiSolidEdit } from "react-icons/bi";
import PolyhouseCreateEditForm from '@/components/(owner)/market-place/polyhouse/_elements/polyhouse-form';
import { useUpdatePolyhouse } from '@/data-handling/queries/market-place-queries';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';

type EditPolyhouseDetailsProps = {
  polyhouse : any;
  isDisabled? : boolean;
}

const EditPolyhouseDetails : React.FC<EditPolyhouseDetailsProps> = ({polyhouse, isDisabled}) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<ModalWindowRef>(null);
const {mutateAsync : updatePolyhouse} = useUpdatePolyhouse();
  async function handleFormSubmit(data : POLYHOUSE_SCHEMA_FORM_TYPE){
    try {
const results = await updatePolyhouse({...data, polyhouse_id : polyhouse?._id});
if(results?.status===HTTP_RESPONSE_CODES.OK){
  modalRef.current?.closeModal();
  queryClient.invalidateQueries({queryKey : ['polyhouses_list']});
}

      }
      catch (err: any) {

        console.log(err);
      }
}
  return (
    <section className=' text-[4vw] md:text-[2.2vw]'>
  <ModalWindow isItButton={false} buttonText={'Link Polyhouse'} buttonClasses={'bg-[#6BBBE9] text-white'}
    OpenComponent={BiSolidEdit} title={'Edit Polyhouse Details'} openButtonClassName='text-[#6BBBE9] lg:text-[0.7em]'
    modalClassName='max-md:h-[75dvh] overflow-y-scroll md:w-[60%] md:h-[70dvh] dark:bg-[#122031] my-[2%] '
    CloseComponent={IoMdCloseCircle} closeButtonClassName='text-red-500 lg:text-[0.7em]' isOpenDisabled={isDisabled}
    ref={modalRef}
  >
    <>
    <PolyhouseCreateEditForm submitButtonText={'Update '} handleFormSubmit={handleFormSubmit} INITIAL_VALUES={{...polyhouse}} />
      
    </>
  </ModalWindow>
    </section>
  
  )
}

export default EditPolyhouseDetails;
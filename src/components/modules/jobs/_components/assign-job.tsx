import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import { useCreateDataAsPerEndpoint,  } from '@/data-handling/queries/dynamic-component-queries';
import React, { useMemo, useRef, useState } from 'react'
import { BiSolidAddToQueue } from 'react-icons/bi';
import { IoMdCloseCircle } from 'react-icons/io';

import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';
import JobDynamicForm from '@/components/modules/jobs/_components/job-dynamic-form';
import { getUserAccessLevels } from '@/lib/utils';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { ACCESS_LEVELS_TYPE } from '@/types';

type Props = {
    endpoint : string;
}

const AssignJobToLabours = ({endpoint}: Props) => {
  const modified_endpoint = endpoint==="jobs" ? "jobs_allotment" : endpoint;
const {mutateAsync : createDataAsPerEndpoint} = useCreateDataAsPerEndpoint(`jobs_allotment`);
const currentUser = useAppSelector((state)=>state?.user.currentUser );
const {create,} :ACCESS_LEVELS_TYPE= getUserAccessLevels(currentUser?.access || [], endpoint, `${currentUser?.user_type}`);
 
  const queryClient = useQueryClient();
  const modalRef = useRef<ModalWindowRef>(null);


  async function handleFormSubmission(data: any) { 

    try {

      const response = await createDataAsPerEndpoint(data);
      if (response?.status === HTTP_RESPONSE_CODES?.CREATED) {
        queryClient.invalidateQueries({ queryKey: [modified_endpoint] });
        modalRef.current?.closeModal();
      }
    } catch (error) {
      console.log(error)
    }
  }

   // if(endpoint!=="labours_data" )return null;

  return (
    <article>
      <ModalWindow
        OpenComponent={BiSolidAddToQueue}
        CloseComponent={IoMdCloseCircle}
        // isOpenDisabled={!create}
        // todo Enable the Modal for PolyERP
         isOpenDisabled={true}

        ref={modalRef}
        isItButton={true}
        buttonText={'Assign Job'}
        title={'Assign Job'}
        closeButtonClassName={`text-red-500 hover:text-red-800 cursor-pointer hover:scale-105 md:text-[1.5em]`}
        openButtonClassName={``}
        modalClassName={`md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto`}
      
      >
        
        <JobDynamicForm 
        handleFormSubmission={(data : any) => handleFormSubmission(data)}
        isAssignJob={true}
        />
      </ModalWindow>
    </article>
  )
}

export default AssignJobToLabours;
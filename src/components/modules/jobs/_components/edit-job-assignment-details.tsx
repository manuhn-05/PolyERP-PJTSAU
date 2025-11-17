import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import { FiEdit2 } from "react-icons/fi";
import {  useUpdateDataAsPerEndpoint,  } from '@/data-handling/queries/dynamic-component-queries';
import React, {  useRef,  } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';
import JobDynamicForm from './job-dynamic-form';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { ACCESS_LEVELS_TYPE } from '@/types';
import { getUserAccessLevels } from '@/lib/utils';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { JOB_STATUS } from '@/constants/titles';

type Props = {
    endpoint : string;
    item : any;
fromTitle? : string;
status : string;
}

const EditJobAssignmentDetails = ({endpoint, item, status}: Props) => {

    const queryClient = useQueryClient();
    const modalRef = useRef<ModalWindowRef>(null);

    const currentUser = useAppSelector((state)=>state?.user.currentUser );
    const {update} :ACCESS_LEVELS_TYPE= getUserAccessLevels(currentUser?.access || [], "jobs", `${currentUser?.user_type}`);

    const { mutateAsync: updateDataAsPerEndpoint } = useUpdateDataAsPerEndpoint(`${endpoint}`)
     
async function handleSubmitForm(data : any){
    try {
        const response = await updateDataAsPerEndpoint({ ...data, _id: item._id, });

        if (response?.status === HTTP_RESPONSE_CODES.OK) {
          queryClient.invalidateQueries({ queryKey: [endpoint] });
          modalRef.current?.closeModal();
        }
    } catch (error) {
        console.log(error)
    }
}
if(status===JOB_STATUS.APPROVED) return null;
  return (
    <div>
         <ModalWindow
        OpenComponent={FiEdit2}
        CloseComponent={IoMdCloseCircle}
        ref={modalRef}
        isItButton={false}
        buttonText={'Assign Job'}
        title={'Assign Job'}
        // todo - Enable for PolyERP
        // isOpenDisabled={!update}
        isOpenDisabled={true}

        closeButtonClassName={`text-red-500 hover:text-red-700 hover:scale-105 md:text-[1.5em]`}
        openButtonClassName=' text-[#000] dark:text-[#6BBBE9] lg:text-[1.15em]'
        isIconInsideButton={true}
        modalClassName={`md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto`}
      >
        <JobDynamicForm values={item} handleFormSubmission={(data : any) => handleSubmitForm(data)}
        />
      </ModalWindow>
    </div>
  )
}

export default EditJobAssignmentDetails
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef } from 'react';
import DynamicForm from '@/components/dynamic-renderer/actions/dynamic-form';
import { DYNAMIC_FORM_OBJ,  } from '@/components/selected-modules/_components/constants';

import { IoMdCloseCircle } from 'react-icons/io';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import {  useUpdateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useQueryClient } from '@tanstack/react-query';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { FaEdit } from 'react-icons/fa'
import { usePathname } from 'next/navigation';
import EditSupplierDetails from '@/components/modules/suppliers/_components/edit-suppliers';

type EditLabourDetailsProps = {
    endpoint: string;
    item : any;
}
const EditLabourDetails : React.FC<EditLabourDetailsProps> = ({endpoint, item})  => {
    const path = usePathname();
    const modalRef = useRef<ModalWindowRef>(null);
    
    async function handleFormSubmission(data: any) {
        try {
    
       
        } catch (error) {
          console.log(error)
        }
    
      }

  return (
    <ModalWindow modalClassName='md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto md:text-[1.15em]' isItButton={false} 
    openButtonClassName='text-[#4c00ff] dark:text-[#6BBBE9] lg:text-[1.5em]'
    buttonText={'Edit Details'} OpenComponent={FaEdit} CloseComponent={IoMdCloseCircle} title={'Edit'}
    ref={modalRef}
  >
<div>
    
</div>

  </ModalWindow>
  )
}

export default EditLabourDetails;
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import React, { useRef } from 'react';
import DynamicForm from '@/components/dynamic-renderer/actions/dynamic-form';
import { DYNAMIC_FORM_OBJ, JOB_CREATION_FORM_FIELDS } from '@/components/selected-modules/_components/constants';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { IoMdCloseCircle } from 'react-icons/io';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { useCreateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useQueryClient } from '@tanstack/react-query';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';


type Props = { 
  path : string, 
  btnTitle : string,
 selectedModuleForm : any;
}

const CreateDetails = ({path, btnTitle, selectedModuleForm}: Props) => {
  const {currentUser} = useAppSelector((state) => state.user);
  const {selectedPolyhouse} = useAppSelector((state) => state.polyhouse);
  const {mutateAsync : createDataAsPerEndpoint} =useCreateDataAsPerEndpoint(`${path}`);
  const queryClient = useQueryClient();
  const modalRef = useRef<ModalWindowRef>(null);

  async function handleFormSubmission(data: any) {
    try {
console.log(data)
    //  const response = await createDataAsPerEndpoint({...data, polyhouse_id: selectedPolyhouse?.value, supervisor : currentUser?._id});

    //   if(response?.status === HTTP_RESPONSE_CODES.CREATED){
    //     queryClient.invalidateQueries({queryKey : [path]});
    //     modalRef.current?.closeModal();
    //   }
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div>
    
<ModalWindow modalClassName='md:w-[60%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto' isItButton={true}
        buttonText={`${btnTitle}`} OpenComponent={BiSolidAddToQueue} CloseComponent={IoMdCloseCircle} title={'Create '}
        ref={modalRef}
        // todo - Enable for PolyERP
        isOpenDisabled={true}
      >
        <DynamicForm schema={selectedModuleForm} handleFormSubmission={(data: any) => handleFormSubmission(data)} />
          
      </ModalWindow>
    
      
    </div>
  )
}

export default CreateDetails;
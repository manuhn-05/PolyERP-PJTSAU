import React, { useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
  } from '@chakra-ui/react'
import { useCreateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import ModalWindow, { ModalWindowRef } from '@/components/modal/ModalWindow';
import { IoCloseCircle } from "react-icons/io5";

import { BiSolidEyedropper } from 'react-icons/bi';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';


type CreateNewToolProps = {
    path : string;
    handleModalCloseFromParent : () => void
}

const CreateNewTool : React.FC<CreateNewToolProps> = ({path,handleModalCloseFromParent }) => {
const queryClient = useQueryClient();
    const [newToolForm, setNewToolForm] = useState<any>({});
    const modalRef = useRef<ModalWindowRef>(null);
    const {mutateAsync : createNewTool} = useCreateDataAsPerEndpoint(path);

    async function handleCreateNewTool(e : any){
        e.preventDefault();
        const data = {...newToolForm, data : newToolForm?.name, isCustomTool : true};
        try {
const response = await createNewTool(data);
if(response?.status === HTTP_RESPONSE_CODES.CREATED){
    queryClient.invalidateQueries({queryKey : [path]});
    setNewToolForm({});
    modalRef.current?.closeModal();
    handleModalCloseFromParent();

}
        } catch (error) {
            console.log(error)
        }
    }

    function handleOnChange(e : any){
        setNewToolForm({...newToolForm, [e.target.name] : e.target.value});
    }
  return (
    <div>
<ModalWindow
    OpenComponent={BiSolidEyedropper}
    CloseComponent={IoCloseCircle}
    title={'Create New Tool'} titleStyles={`md:text-[0.5em]`}
    isItButton={true} buttonText={`Create New Tool`}
modalClassName={`md:w-[30%] dark:bg-[#122031] md:h-[60dvh] overflow-y-auto`}
ref={modalRef}
    >
        <section className={`md:text-[0.4em]`}>
        <form action="" onSubmit={handleCreateNewTool}>
<div>
    
        <label htmlFor="name">Name</label>
        <Input type="text" name="name" value={newToolForm?.name} id="name" onChange={handleOnChange} />
    </div>
    <div>
    
        <label htmlFor="description">Description</label>
        <Input type="text" name="description" value={newToolForm?.description} id="description" onChange={handleOnChange} />
    </div>
    <div className={`my-[2%]`}>
        <Button type='submit'>
            Submit
        </Button>
    </div>
 </form>
        </section>
    </ModalWindow>
    </div>
  )
}

export default CreateNewTool
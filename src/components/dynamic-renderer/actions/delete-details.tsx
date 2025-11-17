import React, { useRef } from 'react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import { useDeleteDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { ACCESS_LEVELS_TYPE } from '@/types';
import { getUserAccessLevels } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Trash2  } from "lucide-react"

  type DeleteDetailsComponentProps = {
    endpoint : string,
    item : any
  }

const DeleteDetailsComponent: React.FC<DeleteDetailsComponentProps> = ({endpoint, item}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null);
  const pathname = usePathname()?.split("/")[3];

const currentUser = useAppSelector((state)=>state?.user.currentUser );
const {delete: delete_access} :ACCESS_LEVELS_TYPE= getUserAccessLevels(currentUser?.access || [], `${pathname}`, `${currentUser?.user_type}`);

  const {mutateAsync : deleteDetails} = useDeleteDataAsPerEndpoint(`${endpoint}`, );
  const queryClient = useQueryClient();

async function handleDeleteItem(item_id : string){
    try {
        const response = await deleteDetails(`${item_id}`);
   
        if(response?.status===HTTP_RESPONSE_CODES.OK){
            queryClient.invalidateQueries({ queryKey: [endpoint] });
            onClose();

        }
    } catch (error) {
        console.log(error);
    }
}
  return (
    <div>
        <Button  bg={"transparent"} _hover={{backgroundColor : "#6BBBE9", }} 
        //  todo -  Enable for PolyERP
        // disabled={!delete_access}
        disabled={true}

         className={`hover:bg-[#6BBBE9] p-[1%] flex items-center justify-center ${!delete_access ? 'cursor-not-allowed opacity-50' : ''} `}>
            <Trash2  className={`text-destructive text-red-500 cursor-pointer md:text-[1.15em] ${!delete_access ? 'cursor-not-allowed opacity-50' : ''} `} onClick={onOpen} />
        </Button>
          
          <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
          >
              <AlertDialogOverlay>
                  <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                          Delete <span className='capitalize'>{`${endpoint}`?.split("_").join(" ")} </span> Details
                      </AlertDialogHeader>

                      <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                          </Button>
                          <Button colorScheme='red' onClick={() => handleDeleteItem(item._id)} ml={3}>
                              Delete
                          </Button>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialogOverlay>
          </AlertDialog>
    </div>
  )
}

export default DeleteDetailsComponent;
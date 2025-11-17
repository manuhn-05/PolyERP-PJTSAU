import React from 'react'
import {   Button, Modal,
  ModalOverlay, ModalContent,
  ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react';
import StockCreateEditForm from '@/components/modules/stocks/_components/stock-edit-create-form';
import { useCreateDataAsPerEndpoint } from '@/data-handling/queries/dynamic-component-queries';
import { usePathname } from 'next/navigation';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';

const AddStockToPurchaseRegistry = () => {
  const pathname = usePathname()?.split("/")[3];
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: addStockToPurchaseRegistry } = useCreateDataAsPerEndpoint(`${pathname}`)

  async function handleSubmit(data: any) {
    try {
      const response = await addStockToPurchaseRegistry(data);

      if (response?.status === HTTP_RESPONSE_CODES.CREATED) {
        queryClient.invalidateQueries({ queryKey: [`${pathname}`] });
        onClose();
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button disabled={true} onClick={onOpen} bg={`#6BBBE9`} color={'white'} className={`text-white`}>Purchase Registry</Button>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='1.75em'>Purchase Registry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StockCreateEditForm handleFormSubmit={(data: any) => handleSubmit(data)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddStockToPurchaseRegistry;
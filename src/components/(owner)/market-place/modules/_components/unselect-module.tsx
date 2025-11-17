import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

type Props = {
isOpen: boolean
leastDestructiveRef?: any
onClose(): void;
confirmDelete(): void;
selectedModule : any
}

const UnselectModule = ({isOpen, leastDestructiveRef, onClose, confirmDelete, selectedModule}: Props) => {

  return (
    <div>
        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Unselect Module
            </AlertDialogHeader>

            <AlertDialogBody>
            This action will permanently delete the module <span className='font-bold'> {selectedModule?.title}</span> and its associated data. Once deleted, it cannot be recovered. Do you want to continue?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default UnselectModule
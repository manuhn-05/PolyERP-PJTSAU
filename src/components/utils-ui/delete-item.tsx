import React from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { DELETE_ALERT_DESCRIPTION } from '@/constants/polyhouse';
import { MdDelete } from 'react-icons/md';

type DeleteItemProps = {
  item_id: string;
  handleDeleteItem: (polyhouse_id: string) => void;
  isDisabled?: boolean;
};

const DeleteItem: React.FC<DeleteItemProps> = ({ item_id, handleDeleteItem, isDisabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  async function handleDeleteConfirm(e: React.MouseEvent) {
    e.stopPropagation(); // ✅ stop bubbling to parent
    try {
      handleDeleteItem(item_id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()} // ✅ prevent bubbling from container
    >
      <button
        disabled={isDisabled}
        onClick={(e) => {
          e.stopPropagation(); // ✅ stop bubbling when opening dialog
          onOpen();
        }}
      >
        <MdDelete
          className={`text-red-500 md:text-[1.25em] cursor-pointer ${
            isDisabled && 'cursor-not-allowed text-opacity-40'
          }`}
        />
      </button>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>Delete!</AlertDialogHeader>
            <AlertDialogBody>{DELETE_ALERT_DESCRIPTION}</AlertDialogBody>
            <AlertDialogFooter className="flex justify-evenly w-full">
              <Button
                ref={cancelRef}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                colorScheme="blue"
              >
                Close
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                colorScheme="red"
                marginX={'2%'}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default DeleteItem;

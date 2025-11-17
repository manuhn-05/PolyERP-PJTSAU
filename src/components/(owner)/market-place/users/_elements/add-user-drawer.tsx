
import React, { useRef } from 'react';
import {
  Drawer, DrawerBody, DrawerFooter,
  DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, useDisclosure, Button,
} from '@chakra-ui/react'
import { useTranslation } from "react-i18next";

import RegisterUserWithPolyhouseAndAssignThem from '@/components/(owner)/market-place/users/_elements/add-and-update-user-form';
import { ADD_USER_FORM_INITIAL_VALUES } from '@/constants/market-place';
import { useOnboardUserToPolyhouse, useUpdateUserDetails } from '@/data-handling/queries/market-place-queries';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import { useQueryClient } from '@tanstack/react-query';
import { FaRegEdit } from "react-icons/fa";

type AddUserToTeamDrawerProps = {
  isUpdateComponent: boolean;
  btnTranslatorKey: string;
  drawerHeaderTranslatorKey: string;
  initialValues: typeof ADD_USER_FORM_INITIAL_VALUES;
  isDisabled? : boolean
}

const AddUserToTeamDrawer: React.FC<AddUserToTeamDrawerProps> = ({ btnTranslatorKey, drawerHeaderTranslatorKey, initialValues, isUpdateComponent, isDisabled }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: onboardUserToPolyhouse, isPending: isOnboardingUserPending } = useOnboardUserToPolyhouse();
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, } = useTranslation("common");
  const btnRef = useRef(null);

  async function handleUserOnboardToPolyhouse(data: any) {
    try {
      if (isUpdateComponent) {
        const results = await updateUserDetails(data);
        if (results?.status === HTTP_RESPONSE_CODES?.CREATED) {
          queryClient.invalidateQueries({ queryKey: ['onboarded_users_list'] });
        }
        onClose();
        return;
      }
      const results = await onboardUserToPolyhouse(data);
      if (results?.status === HTTP_RESPONSE_CODES?.CREATED) {
        queryClient.invalidateQueries({ queryKey: ['onboarded_users_list'] });
      }
      onClose();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        isUpdateComponent ? (<>
        <button onClick={onOpen}>
        <FaRegEdit className={`text-[#6BBBE9] font-bold cursor-pointer ${isDisabled && "cursor-not-allowed text-opacity-40"}`}  />   
        </button>
         
        </>) :
          (<>
            <Button className='bg-[#6BBBE9]' ref={btnRef} colorScheme='#6BBBE9' onClick={onOpen}>
              {t(`${btnTranslatorKey}`)}
            </Button>
          </>)
      }

      <Drawer
        size={'xl'}
        isOpen={isOpen}
        placement={isUpdateComponent ? 'left' : 'right'}
        onClose={onClose}
        finalFocusRef={btnRef}

      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton />
          <DrawerHeader className=' dark:bg-[#122031] dark:text-white'>{drawerHeaderTranslatorKey}</DrawerHeader>

          <DrawerBody className=' dark:bg-[#122031] dark:text-white'>
            <RegisterUserWithPolyhouseAndAssignThem INITIAL_VALUES={{ ...initialValues }}
              isPending={isOnboardingUserPending} isItUpdaingComponent={isUpdateComponent}
              handleOnFormSubmit={(data: any) => handleUserOnboardToPolyhouse(data)} />
          </DrawerBody>

          <DrawerFooter className='dark:bg-[#122031] dark:text-white'>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddUserToTeamDrawer;
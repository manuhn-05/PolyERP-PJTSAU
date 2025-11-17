"use client";
import React  from 'react';
import {Box,Text} from '@chakra-ui/react'
  import { useTranslation } from "react-i18next";
import { LANGUAGE_JSON_KEYS } from '@/constants/language-consts';
import AddUserToTeamDrawer from '@/components/(owner)/market-place/users/_elements/add-user-drawer';
import ListOfOnboardedUsers from '@/components/(owner)/market-place/users/_components/list-of-onboarded-users';
import { ADD_USER_FORM_INITIAL_VALUES } from '@/constants/market-place';




const AddUsersAndAssignThem = () => {
    const { t,  } = useTranslation("common");
   
  return (
    <>
      <Box className='flex justify-between items-center md:w-[90%] mx-auto p-[1%]'>
        <Text className='font-semibold md:text-[0.8em]' as={'h3'}>{t(`${LANGUAGE_JSON_KEYS?.TEAM_AND_ROLES}`)}</Text>
        <AddUserToTeamDrawer btnTranslatorKey={`${LANGUAGE_JSON_KEYS?.ADD_MEMBER}`} 
        drawerHeaderTranslatorKey={`Onboard User to Polyhouse`} initialValues={{...ADD_USER_FORM_INITIAL_VALUES}}
        isUpdateComponent={false}
        />

      </Box>
<ListOfOnboardedUsers />

    </>
  )
}

export default AddUsersAndAssignThem
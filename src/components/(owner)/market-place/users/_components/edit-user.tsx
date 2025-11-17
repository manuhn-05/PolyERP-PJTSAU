import React from 'react';
import { LANGUAGE_JSON_KEYS } from '@/constants/language-consts';
import AddUserToTeamDrawer from '@/components/(owner)/market-place/users/_elements/add-user-drawer';

type Props = {
    userData : any
    isDisabled? : boolean
}

const EditUserDetails = ({userData, isDisabled}: Props) => {
  return (
    <div>
         <AddUserToTeamDrawer btnTranslatorKey={`${LANGUAGE_JSON_KEYS?.ADD_MEMBER}`} 
        drawerHeaderTranslatorKey={`Edit User Details`} initialValues={{...userData}}
        isUpdateComponent={true} isDisabled={isDisabled}
        />
    </div>
  )
}

export default EditUserDetails;
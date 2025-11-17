import { useFetchAllOnboardedUsers } from '@/data-handling/queries/market-place-queries';
import { useAppSelector } from '@/data-handling/store/hooks/redux-hooks';
import { Box } from '@chakra-ui/react';
import React from 'react'
import UserCard from "@/components/(owner)/market-place/users/_elements/user-card";


const ListOfOnboardedUsers = () => {
    const {currentUser} = useAppSelector((state) => state.user);

    const {data : onboardedUsersList} = useFetchAllOnboardedUsers(`${currentUser?._id}`);

  return (
    <Box className='grid md:grid-cols-3 lg:grid-cols-4 gap-[1%] md:w-[95%] mx-auto p-[1%] text-[4vw] md:text-[2.2vw]'>
        {
            onboardedUsersList?.data?.map((user : any) => (
                <UserCard key={user?._id} user={user} />
            ))
        }
    </Box>
  )
}

export default ListOfOnboardedUsers;
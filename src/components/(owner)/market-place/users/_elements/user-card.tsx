
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Box, Text } from '@chakra-ui/react'
import Image from 'next/image';
import DefaultUser from "@/images/assets/user/placeholder.png";
import { FaEnvelope, FaPhone, FaRegUser } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';
import { HTTP_RESPONSE_CODES } from '@/data-handling/endpoints/server-endpoints';
import {  useDeleteUser } from '@/data-handling/queries/market-place-queries';

import { USER_TYPE_TEXTS } from '@/constants/auth-consts';

const DeleteUserDynamic = dynamic(() => import('@/components/utils-ui/delete-item'));
const EditUserDetailsDynamic = dynamic(() => import('@/components/(owner)/market-place/users/_components/edit-user'));
type Props = {
    user: any;
}

const UserCard = ({ user }: Props) => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteUser } = useDeleteUser();
   

    async function handleDeleteUser(user_id: string) {
        try {

            const results = await deleteUser(user_id);
            if (results?.status === HTTP_RESPONSE_CODES.OK) {
                queryClient.invalidateQueries({ queryKey: ['onboarded_users_list'] });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Card className='dark:bg-[#28466b] dark:text-white'>
                <CardHeader>
                    <div className='w-[80%] h-[80%] rounded-full flex justify-center mx-auto'>
                        {/* TODO : Add user profile photo */}
                        <Image src={DefaultUser} alt={`User Profile Photo`} width={100} height={100} className='w-full h-full rounded-full' />
                    </div>
                </CardHeader>
                <CardBody className='md:text-[0.45em] '>
                    <Text><FaRegUser className='inline-block mr-1' /> {user?.name}</Text>
                    <Text><FaEnvelope className='inline-block mr-1' /> {user?.email || "-"}</Text>
                    <Text><FaPhone className='inline-block mr-1' /> {user?.phone || "-"}</Text>
                    <Text><MdPlace className='inline-block mr-1' /> {user?.state || "-"}</Text>
                </CardBody>
                <CardFooter className='p-0 text-[0.45em] flex justify-evenly w-full border-t'>
                   
                    <DeleteUserDynamic isDisabled={user?.user_type===USER_TYPE_TEXTS.OWNER} handleDeleteItem={(user_id: string) => handleDeleteUser(user_id)} item_id={user._id} />
                      
                    <EditUserDetailsDynamic userData={user} isDisabled={user?.user_type===USER_TYPE_TEXTS.OWNER} />
                </CardFooter>
            </Card>
        </Box>
    )
}

export default UserCard;
"use client";
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/navigation';
import { RiArrowGoBackFill } from "react-icons/ri";
type Props = {}

const BackHome = (props: Props) => {
    const router = useRouter();
  return (
    <div>
        <Button className={`text-[#0D6EFD]`} variant={'primary'} onClick={()=>router.back()}>
        <RiArrowGoBackFill />
             Back</Button>
    </div>
  )
}

export default BackHome
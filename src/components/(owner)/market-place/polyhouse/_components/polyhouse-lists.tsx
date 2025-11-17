"use client";
import React from 'react'
import { useFetchPolyhousesList } from '@/data-handling/queries/market-place-queries';
import { Grid, } from "@chakra-ui/react"
import { PolyhouseCard } from '@/components/(owner)/market-place/polyhouse/_elements/polyhouses-card';

const PolyhousesList = () => {
  // TODO - isLoggedin is optional as of now
  const { data: polyhousesList } = useFetchPolyhousesList(``, true);

  return (
    <Grid className='w-full h-full p-[1%]' templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={"1%"}>
      {
        polyhousesList?.data?.map((polyhouse: any) => (
          <PolyhouseCard key={polyhouse._id} polyhouse={polyhouse} />
        ))
      }
    </Grid>
  )
}

export default PolyhousesList;
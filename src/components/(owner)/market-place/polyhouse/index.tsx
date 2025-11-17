import React from 'react';
import { Container } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import PolyhousePlots from '@/components/(owner)/market-place/polyhouse-plots';
const LinkNewPolyhouseDynamic = dynamic(() => import('@/components/(owner)/market-place/polyhouse/_components/register-polyhouse'));
const PolyHouseListDynamic = dynamic(() => import('@/components/(owner)/market-place/polyhouse/_components/polyhouse-lists'));

const PolyhouseComponent = () => {
  return (
    <article className='w-full h-full shadow-md bg-white dark:bg-[#122031] rounded-lg text-[4vw] md:text-[2.2vw]'>
      <LinkNewPolyhouseDynamic />
      <Container maxW={"100%"}>
        <PolyHouseListDynamic />
      </Container>
      <Container maxW={"100%"}>
        {/* <PolyhousePlots /> */}
      </Container>

    </article>
  )
}

export default PolyhouseComponent;
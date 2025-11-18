"use client";
import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { Button, useDisclosure, } from "@chakra-ui/react"
import PolyLight from "@/images/assets/logos/logo1-dark-no-bg.png"
import { HOME_NAVBAR } from '@/constants/home-consts'
import { usePathname } from 'next/navigation';
import { CLIENT_ENDPOINTS } from '@/data-handling/endpoints/client-endpoints';
import {     Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, } from '@chakra-ui/react';
  import { FaBars } from "react-icons/fa";
  import { motion,  } from "framer-motion";

const HomeNavbar = () => {
    const [scroll, setScroll] = React.useState(0);
    const path = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isHomePageRoute = (path === "/" || path === "/about" );


useEffect(()=>{    const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
},[])
const isNavbarVisible =useMemo(()=>{
    return HOME_NAVBAR.some(item => item.link === path) || isHomePageRoute;
},[path,isHomePageRoute])

// if(!isNavbarVisible) return null;

if(path!=="/")return null;
    return (
        <section className={`sticky top-0 left-0 w-full z-10 text-[4vw] md:text-[2.2vw] `}>
            <nav className={`w-full mx-auto hidden md:flex justify-between items-center absolute top-0 
                ${isHomePageRoute ? (scroll > 600 ? "bg-white dark:bg-[#122031] shadow-sm" : "bg-transparent") : "bg-white shadow-sm"}`}>
               <section className={`w-[90%] mx-auto flex justify-between items-center`}>
               <div className='md:w-[15%] ' >
                    <Link href={"/"}>
                    <Image src={PolyLight} alt="Logo" className="w-fit h-full object-contain" />
                    </Link>
                </div>
                <div className='flex items-center justify-between md:w-[70%]'>
                    <ul className={`w-full flex justify-evenly items-center font-[500] md:text-[0.5em]`}>
                        {
                            HOME_NAVBAR?.map((item) => (
                              <li key={item?.id} className={`w-full `}>
                                  <Link href={`${item?.link}`}  
                                className={`${path===item?.link ? "font-semibold px-[10%] py-[0.5%] bg-[#6BBBE9] rounded-lg text-white" : ""}`}>
                                    <span className={``} >{item.name}</span>
                                </Link>
                              </li>
                            ))
                        }
                    </ul>
                    <Link href={CLIENT_ENDPOINTS.LOGIN}>
                        <Button variant={"solid"} className='bg-[#6BBBE9]' colorScheme='#6BBBE9' >
                            Grow with Us
                        </Button>
                    </Link>
                </div>
               </section>
            </nav>
            <nav className='flex md:hidden'>
                <section className='w-full flex justify-between items-center p-[2%]'>
                {/* <Button ref={btnRef} bg={"transparent"} onClick={onOpen} _focus={{bg : "transparent"}} > */}
                <FaBars  onClick={onOpen}  className={`text-[#6BBBE9] text-[2em]`} />
      {/* </Button> */}
                <div className='w-[35%]' >
                    <Image src={PolyLight} alt="Logo" className="w-fit h-full object-contain" />
                </div>
             
                </section>
                <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}

      >
        <DrawerOverlay />
        <DrawerContent className=''>
          <DrawerCloseButton />
          <DrawerHeader className='bg-black'>
          <div className='w-[85%]' >
                    <Image src={PolyLight} alt="Logo" className="w-fit h-full object-contain" />
                </div>
          </DrawerHeader>

          <DrawerBody className='bg-black'>
           Hi
          </DrawerBody>

          <DrawerFooter className='bg-black'>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

            </nav>
        </section>
    )
}

export default HomeNavbar
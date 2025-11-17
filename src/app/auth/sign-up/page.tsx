import React from 'react';
import Image from "next/image";
import Link from "next/link";
import DarkLogo from "@/images/assets/logos/logo1-dark-no-bg.png";
import SignUpUser from '@/components/Auth/sign-up';
import BackHome from '@/components/utils-ui/back-home';



const SignUp = () => {
  return (
    <section >
      <div className="flex flex-wrap items-center">
        <div className='w-full xl:w-1/2'>
        <BackHome />
          <SignUpUser />
        </div>

        <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
          <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 py-[3%] dark:!bg-dark-2 dark:bg-none">
            <Link className="mb-10 inline-block md:w-[32.5%]" href="/">


              <Image
                src={DarkLogo}

                className="block"
                alt="PolyERP logo"
                role="presentation"
                quality={100}
              />
            </Link>
            <p className="mb-3 text-xl font-medium text-dark dark:text-white">
              Sign up to your account
            </p>

            <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
              Welcome to PolyERP!
            </h1>

            <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
              Please sign up to your account by completing the necessary
              fields
            </p>

            <div className="">
              <Image
                src={"/images/grids/grid-02.svg"}
                alt="Logo"
                width={405}
                height={325}
                className="mx-auto dark:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
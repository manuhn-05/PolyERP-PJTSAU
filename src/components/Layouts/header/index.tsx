"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";
import { MenuIcon } from "@/components/Layouts/header/icons";
import { Notification } from "@/components/Layouts/header/notification";
import { ThemeToggleSwitch } from "@/components/Layouts/header/theme-toggle";
import { UserInfo } from "@/components/Layouts/header/user-info";
import DarkLogo from "@/images/assets/logos/logo-mini-dark.jpg";
import PolyLight from "@/images/assets/logos/logo-mini-light.jpg"
import PolyhousesDropdown from "@/components/(owner)/market-place/polyhouse/_components/polyhouses-dropdown";
import { useAppDispatch, useAppSelector } from "@/data-handling/store/hooks/redux-hooks";
import { setSelectedPolyhouse } from "@/data-handling/store/slices/polyhouse-slice";
import { USER_TYPE_TEXTS } from "@/constants/auth-consts";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const { selectedPolyhouse } = useAppSelector((store) => store?.polyhouse);
  const { currentUser } = useAppSelector((store) => store?.user);
  const isUserOwner = currentUser?.user_type === USER_TYPE_TEXTS.OWNER;

  const dispatch = useAppDispatch();

  function handlePolyhouseChange(option: any) {
    dispatch(setSelectedPolyhouse(option));

  }


  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between border-b
     border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10 max-w-full`}>
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">

          <Image
            src={PolyLight}

            className="dark:hidden"
            alt="PolyERP logo"
            role="presentation"
            quality={100}
            width={32}
            height={32}
          />

          <Image
            src={DarkLogo}

            className="hidden dark:block"
            alt="PolyERP logo"
            role="presentation"
            quality={100}
            width={32}
            height={32}
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          Dashboard
        </h1>

      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div>
          {/* <TextTypeAnimation textSequence={averageResults} /> */}
        </div>
        {/* todo : Enable Notification for PolyERP */}
        {/* <div className={`hidden md:block`}>
          {isUserOwner && <PolyhousesDropdown handleSelectOption={(val: any) => handlePolyhouseChange(val)}
            selectedPolyhouse={selectedPolyhouse} placeHolder="Select Polyhouse" />}
        </div> */}
        {/* TODO Uncomment this block to enable Language Selector */}
        {/* <LanguageSelctor /> */}
        <ThemeToggleSwitch />

{/* todo : Enable Notification for PolyERP */}
        {/* <Notification /> */}

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}

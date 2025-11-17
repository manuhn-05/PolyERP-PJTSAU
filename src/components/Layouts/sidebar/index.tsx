"use client";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_DATA } from "@/components/Layouts/sidebar/data";
import { ArrowLeftIcon, ChevronUp } from "@/components/Layouts/sidebar/icons";
import { MenuItem } from "@/components/Layouts/sidebar/menu-item";
import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";
import { useAppDispatch, useAppSelector } from "@/data-handling/store/hooks/redux-hooks";
import { USER_TYPE_TEXTS } from "@/constants/auth-consts";
import { CLIENT_ENDPOINTS } from "@/data-handling/endpoints/client-endpoints";
import * as Icons from "@/components/Layouts/sidebar/icons";
import { useFetchSelectedModules } from "@/data-handling/queries/market-place-queries";
import PolyhousesDropdown from "@/components/(owner)/market-place/polyhouse/_components/polyhouses-dropdown";
import { setSelectedPolyhouse } from "@/data-handling/store/slices/polyhouse-slice";


export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { currentUser,  } = useAppSelector((state) => state.user);

  const isUserOwner = currentUser?.user_type=== USER_TYPE_TEXTS.OWNER;
  const [dynamic_nav_data, setDynamicNavData] = useState<any>([]);
  const { selectedPolyhouse } = useAppSelector(state => state.polyhouse);
const polyhouse_id = currentUser?.user_type=== USER_TYPE_TEXTS.OWNER ? selectedPolyhouse?.value : currentUser?.polyhouse_id;
  const { data: selectedModulesData, refetch : refetchSelectedModules } = useFetchSelectedModules(polyhouse_id);

  const dispatch = useAppDispatch();

  function handlePolyhouseChange(option : any) {
    dispatch(setSelectedPolyhouse(option));

  }

  const toggleExpanded = (title: string) => {
  // Comment this to enable only one dropdown open at a time and Commnt the following line
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  };


  useEffect(() => {
    NAV_DATA.forEach((section) => {
      section.items.forEach((item) => {
        item.items.forEach((subItem) => {
          if (subItem.url === pathname && !expandedItems.includes(item.title)) {
            setExpandedItems([item.title]);
          }
        });
      });
    });
  }, [pathname, ]);
  

  function dynamicNavDataCreator(){
    
    let dynamicRoutes1 = [];

    if (!selectedPolyhouse && !polyhouse_id) dynamicRoutes1 = [];
    if (isUserOwner) {
      dynamicRoutes1 = selectedModulesData?.data?.map((module: any) => ({
        id: module._id,
        title: module.title,
        url: `/dashboard/selected-modules/${module.path}`,

      }))
    } else {
      const access_levels = currentUser?.access || [];
      dynamicRoutes1 = access_levels?.map((module: any) => ({
        id: module._id,
        title: module.title,
        url: `/dashboard/selected-modules/${module.path}`,

      }))
    }


    const NAV_DATA = [
      {
        label: "MAIN MENU",
        items: [
          {
            title: "Market Place",
            url: `${CLIENT_ENDPOINTS?.POLYHOUSE}`,
            icon: Icons.Table,
            items: [
              {
                title: "Polyhouses",
                url: `${CLIENT_ENDPOINTS?.POLYHOUSE}`,
              },
              {
                title: "Modules",
                url: `${CLIENT_ENDPOINTS?.MODULES}`,
              },
                // todo :  Uncomment for PolyERP
              // {
              //   title: "Users",
              //   url: `${CLIENT_ENDPOINTS?.USERS}`,
              // },
            ],
          },
          {
            title: "Dashboard",
            url: `${CLIENT_ENDPOINTS?.DASHBOARD}`,
            icon: Icons.Calendar,
            items: [],
          },
          {
            title: "Modules",
            icon: Icons.HomeIcon,
            items: !polyhouse_id ? [] : dynamicRoutes1,
          },
          // {
          //   title: "Calendar",
          //   url: `${CLIENT_ENDPOINTS?.CALENDAR}`,
          //   icon: Icons.Calendar,
          //   items: [],
          // },
          {
            title: "Profile",
            url: `${CLIENT_ENDPOINTS?.PROFILE}`,
            icon: Icons.User,
            items: [],
          },
          // {
          //   title: "Forms",
          //   icon: Icons.Alphabet,
          //   items: [
          //     {
          //       title: "Form Elements",
          //       url: `${CLIENT_ENDPOINTS?.FORM_ELEMENTS}`,
          //     },
          //     {
          //       title: "Form Layout",
          //       url: `${CLIENT_ENDPOINTS?.FORM_LAYOUT}`,
          //     },
          //   ],
          // },
          // {
          //   title: "Tables",
          //   url: `${CLIENT_ENDPOINTS?.TABLES}`,
          //   icon: Icons.Table,
          //   items: [
          //     {
          //       title: "Tables",
          //       url:`${CLIENT_ENDPOINTS?.TABLES}`,
          //     },
          //   ],
          // },
          // {
          //   title: "Pages",
          //   icon: Icons.Alphabet,
          //   items: [
          //     {
          //       title: "Settings",
          //       url: "/dashboard/pages/settings",
          //     },
          //   ],
          // },
        ],
      },
      // {
      //   label: "OTHERS",
      //   items: [
      //     {
      //       title: "Charts",
      //       icon: Icons.PieChart,
      //       items: [
      //         {
      //           title: "Basic Chart",
      //           url: `${CLIENT_ENDPOINTS?.OTHERS_CHARTS}`,
      //         },
      //       ],
      //     },
      //     // {
      //     //   title: "UI Elements",
      //     //   icon: Icons.FourCircle,
      //     //   items: [
      //     //     {
      //     //       title: "Alerts",
      //     //       url: "/dashboard/ui-elements/alerts",
      //     //     },
      //     //     {
      //     //       title: "Buttons",
      //     //       url: "/dashboard/ui-elements/buttons",
      //     //     },
      //     //   ],
      //     // },
      //     // {
      //     //   title: "Authentication",
      //     //   icon: Icons.Authentication,
      //     //   url: "/dashboard/auth/sign-in",
      //     //   items: [
      //     //     {
      //     //       title: "Sign In",
      //     //       url: "/dashboard/auth/sign-in",
      //     //     },
      //     //   ],
      //     // },
      //   ],
      // },
    ];

    setDynamicNavData(NAV_DATA);
  }
  useEffect(() => {

    dynamicNavDataCreator();
  },[ selectedModulesData])
useEffect(()=>{
  refetchSelectedModules();
}, [selectedPolyhouse])
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          `w-[290px] max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-[width] 
          duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark`,
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-2 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt- flex-1 overflow-y-auto pr-3 min-[850px]:mt-2 ">
            {dynamic_nav_data?.map((section : any) => {
             
              return (
                <div key={section.label} className="mb-6">
                  <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                    {section.label}
                  </h2>
  
                  <nav role="navigation" aria-label={section.label}>
                    <ul className="space-y-2">
                      {section.items.map((item : any) => {
                      if(!isUserOwner &&  item?.url===`${CLIENT_ENDPOINTS?.POLYHOUSE}`){
                        return null;
                      }
                        return (
                          <li key={item?.title}>
                            {item?.items?.length ? (
                              <div>
                                <MenuItem
                                  isActive={
                                    (item.url && pathname?.startsWith(item.url)) ||
                                    item.items.some(({ url }: any) => pathname?.startsWith(url))
                                  }
                                  onClick={() => toggleExpanded(item.title)}
                                >
                                  <item.icon
                                    className="size-6 shrink-0"
                                    aria-hidden="true"
                                  />
    
                                  <span>{item.title}</span>
    
                                  <ChevronUp
                                    className={cn(
                                      "ml-auto rotate-180 transition-transform duration-200",
                                      expandedItems.includes(item.title) &&
                                        "rotate-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                </MenuItem>
    
                                {expandedItems.includes(item.title) && (
                                  <ul
                                    className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                    role="menu"
                                  >
                                    {item.items.map((subItem : any) => (
                                      <li key={subItem.title} role="none">
                                        <MenuItem
                                          as="link"
                                          href={subItem.url}
                                          isActive={Boolean(pathname?.startsWith(subItem.url))}
                                        >
                                          <span>{subItem.title}</span>
                                        </MenuItem>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              (() => {
                                const href =
                                  "url" in item
                                    ? item.url + ""
                                    : "/" +
                                      item.title.toLowerCase().split(" ").join("-");
    
                                return (
                                  <MenuItem
                                    className="flex items-center gap-3 py-3"
                                    as="link"
                                    href={href}
                                    isActive={pathname === href}
                                  >
                                    <item.icon
                                      className="size-6 shrink-0"
                                      aria-hidden="true"
                                    />
    
                                    <span>{item.title}</span>
                                  </MenuItem>
                                );
                              })()
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                  
                </div>
              )
            })}
            <div className={`block md:hidden`}>
       {isUserOwner && <PolyhousesDropdown handleSelectOption={(val : any) => handlePolyhouseChange(val)} 
        selectedPolyhouse={selectedPolyhouse} placeHolder="Select Polyhouse" />}
       </div>
          </div>
        </div>
      </aside>
    </>
  );
}

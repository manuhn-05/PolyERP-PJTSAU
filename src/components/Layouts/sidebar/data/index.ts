import * as Icons from "@/components/Layouts/sidebar/icons";
import { CLIENT_ENDPOINTS } from "@/data-handling/endpoints/client-endpoints";

export const NAV_DATA = [
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
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: `${CLIENT_ENDPOINTS?.DASHBOARD}`,
          },
        ],
      },
      {
        title: "Calendar",
        url: `${CLIENT_ENDPOINTS?.CALENDAR}`,
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: `${CLIENT_ENDPOINTS?.PROFILE}`,
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: `${CLIENT_ENDPOINTS?.FORM_ELEMENTS}`,
          },
          {
            title: "Form Layout",
            url: `${CLIENT_ENDPOINTS?.FORM_LAYOUT}`,
          },
        ],
      },
      {
        title: "Tables",
        url: `${CLIENT_ENDPOINTS?.TABLES}`,
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url:`${CLIENT_ENDPOINTS?.TABLES}`,
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/dashboard/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: `${CLIENT_ENDPOINTS?.OTHERS_CHARTS}`,
          },
        ],
      },
      // {
      //   title: "UI Elements",
      //   icon: Icons.FourCircle,
      //   items: [
      //     {
      //       title: "Alerts",
      //       url: "/dashboard/ui-elements/alerts",
      //     },
      //     {
      //       title: "Buttons",
      //       url: "/dashboard/ui-elements/buttons",
      //     },
      //   ],
      // },
      // {
      //   title: "Authentication",
      //   icon: Icons.Authentication,
      //   url: "/dashboard/auth/sign-in",
      //   items: [
      //     {
      //       title: "Sign In",
      //       url: "/dashboard/auth/sign-in",
      //     },
      //   ],
      // },
    ],
  },
];

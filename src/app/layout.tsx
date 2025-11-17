import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import HomeNavbar from "@/components/landing/home/home-nav-bar";
import { POLYERP_TAB_NAME } from "@/constants/titles";
import { PolyErpFooter } from "@/components/landing/footer/polyerp-footer";

export const metadata: Metadata = {
  title: {
    template: "",
    default: `${POLYERP_TAB_NAME}`,
  },
  description:
    "",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
            <Providers>
        <HomeNavbar />

          {children}
          <PolyErpFooter />
          </Providers>
      </body>
    </html>
  );
}

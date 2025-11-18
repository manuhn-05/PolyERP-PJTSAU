"use client";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import { Provider as ReduxProvider  } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import AppStore, {persistor} from "@/data-handling/store/app-store";
import {QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import "@/lib/i18n";
import theme from "./theme";

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  // function onRender(id : string, phase : string, actualDuration : any, baseDuration : any, startTime :any, commitTime : any) {
  //   // Aggregate or log render timings...
  //   console.log(phase)
  // }
  return (
    <QueryClientProvider client={queryClient}>
    <ReduxProvider store={AppStore}>
      <PersistGate persistor={persistor} loading={<p >Loading...</p>}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {/* <Profiler id="sidebar"  onRender={onRender}> */}
            <SidebarProvider>{children}</SidebarProvider>

            {/* </Profiler> */}
          </ChakraProvider>
        </ThemeProvider>
      </PersistGate>
      <ToastContainer />
    </ReduxProvider>
    </QueryClientProvider>
  );
}

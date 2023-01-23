import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { NostrSocketProvider } from "../NostrSocketContext";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NostrSocketProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NostrSocketProvider>
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);

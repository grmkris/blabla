import { type AppType } from "next/app";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { NostrSocketProvider } from "../NostrSocketContext";
import { trpc } from "../server/trpc/utils";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NostrSocketProvider>
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </NostrSocketProvider>
      </QueryClientProvider>
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);

import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "../store/appStore";
import type { Event } from "nostr-tools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { exec } from "../web-sqlite/sqlite";
import type { EventTable, TagsTable } from "../web-sqlite/schema";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  const { nostrRelays } = useAppStore.use.saved();

  return (
    <QueryClientProvider client={queryClient}>
      <NostrProvider relayUrls={nostrRelays.map((x) => x.url)} debug={true}>
        <Component {...pageProps} />
        <Toaster />
      </NostrProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);

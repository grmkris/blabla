import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "../store/appStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "../web-sqlite/sqlite";
import { useEffect, useState } from "react";
import { proxy } from "comlink";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  const { nostrRelays } = useAppStore.use.saved();
  const [isSqliteReady, setIsSqliteReady] = useState(false);

  function callback() {
    setIsSqliteReady(true);
  }

  useEffect(() => {
    api.notifyWhenReady(proxy(callback));
  }, []);

  if (!isSqliteReady) {
    return <div>loading...</div>;
  }

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

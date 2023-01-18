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
import { Button } from "../components/common/common";

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

  const clearDB = () => {
    const req = indexedDB.deleteDatabase("db.sqlite");
    req.onsuccess = function () {
      console.log("Deleted database successfully");
    };
    req.onerror = function () {
      console.log("Couldn't delete database");
    };
    req.onblocked = function () {
      console.log(
        "Couldn't delete database due to the operation being blocked"
      );
    };
  };
  if (!isSqliteReady) {
    return (
      <>
        <div>loading...</div>
        In case this message stays for a long time, your local data got
        corrupted, nothing to worry about, the client will repopulate it. Please
        clear the database by clicking the button below.
        <Button onClick={clearDB}>Clear database</Button>
      </>
    );
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

import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { useAppStore } from "../store";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  const relayUrls = useAppStore.use.nostrRelays();
  return (
    <NostrProvider relayUrls={relayUrls.map((x) => x.url)} debug={true}>
      <Component {...pageProps} />
      <Toaster />
    </NostrProvider>
  );
};

export default trpc.withTRPC(MyApp);

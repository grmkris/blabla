import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { useAppStore } from "../store";

const MyApp: AppType = ({ Component, pageProps }) => {
  const relayUrls = useAppStore.use.nostrRelays();
  return (
    <NostrProvider relayUrls={relayUrls.map((x) => x.url)} debug={true}>
      <Component {...pageProps} />
    </NostrProvider>
  );
};

export default trpc.withTRPC(MyApp);

import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "../store/appStore";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { nostrRelays } = useAppStore.use.saved();

  return (
    <NostrProvider relayUrls={nostrRelays.map((x) => x.url)} debug={true}>
      <Component {...pageProps} />
      <Toaster />
    </NostrProvider>
  );
};

export default trpc.withTRPC(MyApp);

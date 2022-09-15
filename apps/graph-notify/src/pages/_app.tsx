import "../../styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to my RainbowKit app123"
});

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App123",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

// Create a query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider chains={chains}>
            <QueryClientProvider client={queryClient} contextSharing={true}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;

import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { NostrProvider } from "nostr-react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "../store/appStore";
import { exec } from "../sqlite";
import type { Event } from "nostr-tools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { EventTable, TagsTable } from "../types";

// Create a client
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

export const insertOrUpdateEvent = async (event: Event) => {
  const { id, pubkey, kind, created_at, content, sig, tags } = event;
  console.log("insertOrUpdateEvent", event);
  try {
    const eventInsert: EventTable = {
      id,
      pubkey,
      kind,
      created_at,
      content,
      sig,
      tags_full: JSON.stringify(tags),
    };
    const result = await exec(eventInsert);
    console.log("insertOrUpdateEvent result", result);
  } catch (e) {
    console.error("insertOrUpdateEvent", e);
    return;
  }
  console.log("insertOrUpdateEvent", "tags", tags);
  for (const tag of tags) {
    const tagInsert: TagsTable = {
      tag: tag[0],
      event_id: id,
      value: tag[1],
    };
    await exec(tagInsert);
  }
  console.log("insertOrUpdateEvent", "done");
};

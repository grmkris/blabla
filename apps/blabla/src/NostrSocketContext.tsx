import type { ReactNode } from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { RelayPool, collect } from "nostr-relaypool";
import type { Event } from "nostr-tools";
import { useAppStore } from "./AppStore";
import { EventKinds } from "./types";
import { insertOrUpdateEvents } from "./web-sqlite/client-functions";
import { dateToUnix } from "./hooks/nostr-relay-pool/useNostrRelayPool";
import { api } from "./web-sqlite/sqlite";
import { proxy } from "comlink";
import { useGetGlobalFilterSinceTime } from "./hooks/useGetGlobalFilterSinceTime";
import { useQueryClient } from "@tanstack/react-query";

export const NostrSocketContext = createContext<{
  relayPool?: RelayPool;
  subscribed: boolean;
  isSqliteReady: boolean;
  now: number;
  refreshNow: () => void;
}>({
  relayPool: undefined,
  subscribed: false,
  isSqliteReady: false,
  now: dateToUnix(new Date()),
  refreshNow: () => ({}),
});

export const NostrSocketProvider = (props: { children: ReactNode }) => {
  const [isSqliteReady, setIsSqliteReady] = useState(false);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const [relayPool, setRelayPool] = useState<RelayPool>();
  const [subscribed, setSubscribed] = useState(false);
  const [now, setNow] = useState(dateToUnix(new Date()));
  const { data } = useGetGlobalFilterSinceTime();
  const queryClient = useQueryClient();
  const refreshNow = () => {
    setNow(dateToUnix(new Date()));
  };

  function callback() {
    setIsSqliteReady(true);
  }

  useEffect(() => {
    api.notifyWhenReady(proxy(callback));
  }, []);

  const createRelayPoolSubscriptions = useCallback(() => {
    if (!relayPool) return;
    const onCollect = async (events: Event[]) => {
      const newEvent = events[events.length - 1];
      await insertOrUpdateEvents([newEvent]);
      if (events && events.length % 2 === 0) {
        if (!subscribed) {
          setSubscribed(true);
          await queryClient.invalidateQueries(["globalFeed"]);
        }
      }
    };
    relayPool.subscribe(
      [
        {
          since: data,
          kinds: [EventKinds.TEXT_NOTE],
        },
      ],
      nostrRelays,
      collect(onCollect),
      0
    );
  }, [relayPool, nostrRelays]);

  useEffect(() => {
    // createRelayPoolSubscriptions();
    if (!!relayPool || !isSqliteReady || subscribed || !data) return;
    const pool = new RelayPool(nostrRelays);
    setRelayPool(pool);
  }, [nostrRelays, relayPool, data]);

  const ret = {
    relayPool,
    subscribed,
    isSqliteReady,
    now: now,
    refreshNow,
  };

  return (
    <NostrSocketContext.Provider value={ret}>
      {props.children}
    </NostrSocketContext.Provider>
  );
};

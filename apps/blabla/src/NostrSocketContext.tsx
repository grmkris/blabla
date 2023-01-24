import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { RelayPool } from "nostr-relaypool";
import { useAppStore } from "./AppStore";
import { EventKinds } from "./types";
import { insertOrUpdateEvents } from "./web-sqlite/client-functions";
import { dateToUnix } from "./hooks/useNostrRelayPool";
import { api } from "./web-sqlite/sqlite";
import { proxy } from "comlink";

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
  const [now, setNow] = useState(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const refreshNow = () => {
    setNow(dateToUnix(new Date()));
  };

  function callback() {
    setIsSqliteReady(true);
  }

  useEffect(() => {
    api.notifyWhenReady(proxy(callback));
  }, []);

  useEffect(() => {
    console.log("NostrSocketProvider: useEffect");
    if (!!relayPool || !isSqliteReady) return;
    const pool = new RelayPool(nostrRelays);
    setRelayPool(pool);
    pool.subscribe(
      [
        {
          since: now - 1000, // all new events from now
          kinds: [EventKinds.TEXT_NOTE],
          limit: 100,
        },
      ],
      nostrRelays,
      (event, isAfterEose) => {
        // console.log("useNostrRelayPool: useEffect: event", event);
        insertOrUpdateEvents([event]);
      },
      undefined,
      (events) => {
        // console.log("useNostrRelayPool: useEffect: events", events);
        // insertOrUpdateEvents(events ?? []);
      },
      { allowDuplicateEvents: false, allowOlderEvents: true }
    );
    setSubscribed(true);
  }, [nostrRelays, relayPool]);

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

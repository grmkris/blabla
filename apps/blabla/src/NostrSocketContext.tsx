import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { RelayPool } from "nostr-relaypool";
import { useAppStore } from "./AppStore";

export const NostrSocketContext = createContext<{ relayPool?: RelayPool }>({
  relayPool: undefined,
});

export const NostrSocketProvider = (props: { children: ReactNode }) => {
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const [relayPool, setRelayPool] = useState<RelayPool>();

  useEffect(() => {
    console.log("NostrSocketProvider: useEffect");
    if (!!relayPool) return;
    const pool = new RelayPool(nostrRelays);
    console.log("NostrSocketProvider: useEffect: pool", pool);
    setRelayPool(pool);
  }, [nostrRelays, relayPool]);

  const ret = {
    relayPool,
  };

  return (
    <NostrSocketContext.Provider value={ret}>
      {props.children}
    </NostrSocketContext.Provider>
  );
};

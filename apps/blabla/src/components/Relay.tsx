import { useNostr } from "../hooks/useNostr";
import { NostrRelay, useAppStore } from "../store";
import { useMemo } from "react";

export const Relay = (props: { relay: NostrRelay; index: number }) => {
  const { relay, relayStatus } = useNostr({ relayUrl: props.relay.url });
  const removeRelay = useAppStore.use.removeRelay();
  const relayStatusTextColor = useMemo(() => {
    switch (relayStatus) {
      case "connected":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-white";
    }
  }, [relayStatus]);

  return (
    <div className={"text-white"}>
      <h1>Nostr Relay</h1>
      <p>Relay: {relay?.url}</p>
      <p className={relayStatusTextColor}>Status: {relayStatus}</p>
      <button onClick={() => removeRelay(props.index)}>Remove Relay</button>
    </div>
  );
};

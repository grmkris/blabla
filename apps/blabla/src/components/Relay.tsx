import { useMemo } from "react";
import { Button } from "./common/common";
import type { NostrRelay } from "../store/appStore";
import { useAppStore } from "../store/appStore";

export const Relay = (props: { relay: NostrRelay; index: number }) => {
  const removeRelay = useAppStore.use.removeNostrRelay();
  const relayStatusTextColor = useMemo(() => {
    switch (props.relay.status) {
      case "connected":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-white";
    }
  }, [props.relay.status]);

  return (
    <div className={"text-white"}>
      <h1>Nostr Relay</h1>
      <p>Relay: {props.relay.url}</p>
      <p className={relayStatusTextColor}>Status: {props.relay.status}</p>
      <Button onClick={() => removeRelay({ url: props.relay.url })}>
        Remove Relay
      </Button>
    </div>
  );
};

import { NostrRelay, useAppStore } from "../store";
import { useMemo } from "react";
import { Button } from "./common/Input";
import { SearchIdentities } from "./SearchIdentities";

export const Relay = (props: { relay: NostrRelay; index: number }) => {
  const removeRelay = useAppStore.use.removeRelay();
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
      <Button onClick={() => removeRelay(props.index)}>Remove Relay</Button>
    </div>
  );
};

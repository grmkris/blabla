import { relayInit } from "nostr-tools";
import { useCallback, useEffect } from "react";
import type { Event } from "nostr-tools/event";
import { useAppStore, useNostrStore } from "../store";
import { useImmer } from "use-immer";

type NostrEvent = {
  id: string;
  kind: number;
  created_at: number;
  tags: string[];
  content: string;
  pubkey: string;
  sig: string;
};

export const useNostrRelays = () => {
  const nostrRelays = useAppStore.use.nostrRelays();
  const addOrUpdateEvent = useNostrStore.use.addOrUpdateEvent();
  const following = useAppStore.use.following();
  const [relayStatus, updateRelayStatus] = useImmer<
    {
      relayUrl: string;
      status: "idle" | "connecting" | "connected" | "error";
    }[]
  >([]);

  const authorsFilter = following.map((identity) => {
    return identity.publicKey;
  });
  console.log(
    "authorsFilter",
    authorsFilter,
    "d19108fdf711b5c29fff5268999f6a9f0f378e06b98c39dec736968e8e670613",
    "4ce98d2384862315ef72cc9b9d78c7bb3d5327b2193bcaf25a187d72d766a93d"
  );
  const initRelay = useCallback(
    async (props: { relayUrl: string; index: number }) => {
      const relay = relayInit(props.relayUrl);
      console.log("inside initRelay for relay", props.relayUrl);
      if (!relayStatus[props.index]) {
        updateRelayStatus((draft) => {
          draft[props.index] = {
            relayUrl: props.relayUrl,
            status: "idle",
          };
        });
      }
      if (
        relayStatus[props.index]?.status &&
        relayStatus[props.index]?.status !== "idle"
      ) {
        console.log("Rerender... relay is not idle");
        return;
      }
      try {
        console.log("inside try");
        await relay.connect();
        console.log("connected");
        relay.on("connect", () => {
          console.log(`connected to ${relay.url}`);
          const sub = relay.sub([
            {
              authors: [
                ...authorsFilter,
                "d19108fdf711b5c29fff5268999f6a9f0f378e06b98c39dec736968e8e670613",
                "4ce98d2384862315ef72cc9b9d78c7bb3d5327b2193bcaf25a187d72d766a93d",
              ],
            },
          ]);
          sub.on("event", (event: Event) => {
            console.log("we got the event we wanted:", event);
            addOrUpdateEvent({ ...event, seen: false });
          });
          sub.on("eose", () => {
            sub.unsub();
          });
          updateRelayStatus((draft) => {
            draft[props.index].status = "connected";
          });
        });
        relay.on("error", () => {
          console.log(`failed to connect to ${relay.url}`);
          updateRelayStatus((draft) => {
            draft[props.index].status = "error";
          });
        });
      } catch (err) {
        console.log(err);
        updateRelayStatus((draft) => {
          draft[props.index].status = "error";
        });
      }
    },
    []
  );

  useEffect(() => {
    nostrRelays.forEach((relay, index) => {
      initRelay({ relayUrl: relay.url, index: index });
    });
  }, [following]);

  return {
    relayStatus,
  };
};

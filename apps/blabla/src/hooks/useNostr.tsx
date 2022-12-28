import { relayInit } from "nostr-tools";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  validateEvent,
  verifySignature,
  signEvent,
  getEventHash,
} from "nostr-tools";
import type { Identity } from "../components/Identity";
import type { Event } from "nostr-tools/event";
import { useNostrStore } from "../store";

type NostrEvent = {
  id: string;
  kind: number;
  created_at: number;
  tags: string[];
  content: string;
  pubkey: string;
  sig: string;
};

export const useNostr = (props: { relayUrl: string }) => {
  const relay = relayInit(props.relayUrl);
  const addOrUpdateEvent = useNostrStore.use.addOrUpdateEvent();
  const [relayStatus, setRelayStatus] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle");

  const initRelay = useCallback(async () => {
    console.log("inside initRelay for relay", props.relayUrl);
    if (relayStatus !== "idle") {
      console.log("Connecting to Nostr relay...");
      return;
    }
    try {
      await relay.connect();
      relay.on("connect", () => {
        console.log(`connected to ${relay.url}`);
        const sub = relay.sub([
          {
            ids: [
              "d7dd5eb3ab747e16f8d0212d53032ea2a7cadef53837e5a6c66d42849fcb9027",
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
        setRelayStatus("connected");
      });
      relay.on("error", () => {
        console.log(`failed to connect to ${relay.url}`);
        setRelayStatus("error");
      });
    } catch (err) {
      setRelayStatus("error");
    }
  }, []);

  useEffect(() => {
    initRelay();
  }, []);

  const createEvent = useMutation(
    async (variables: { content: string; identity: Identity }) => {
      const event: Event = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        pubkey: variables.identity.publicKey,
        content: "hello",
      };

      const id = getEventHash(event);
      const sig = signEvent(event, variables.identity.privateKey);

      const ok = validateEvent(event);
      if (!ok || !event.id) {
        throw new Error("Invalid event");
      }
      const veryOk = verifySignature({ sig, id, ...event });
      if (!veryOk) {
        throw new Error("Invalid signature");
      }

      const sub = relay.sub([
        {
          kinds: [1],
          authors: [variables.identity.publicKey],
        },
      ]);

      sub.on("event", (event: Event) => {
        console.log("got event:", event);
        return { id, sig, ...event };
      });
    }
  );

  return {
    relay: relayStatus ? relay : undefined,
    relayStatus,
    createEvent,
  };
};

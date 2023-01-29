import type { Event as NostrEvent } from "nostr-tools/event";
import { getEventHash, Kind, signEvent } from "nostr-tools";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import type { NewPostSchema } from "../components/NewPost";
import { api } from "../web-sqlite/sqlite";
import toast from "react-hot-toast";
import { NoIdentitiesToast } from "../components/NewPost";
import {
  dateToUnix,
  useNostrRelayPool,
} from "./nostr-relay-pool/useNostrRelayPool";
import { useAppStore } from "../AppStore";
import { useWindowNostr } from "./useWindowNostr";

export const useNewEvent = () => {
  const { publish } = useNostrRelayPool();
  const identities = useAppStore.use.localProfiles();
  const { signEvent: signEventWindow, windowNostr } = useWindowNostr();

  const newNote = useMutation(
    async (variables: {
      data: z.infer<typeof NewPostSchema>;
      eventId?: string;
    }) => {
      if (!identities[0]?.publicKey && !windowNostr) {
        NoIdentitiesToast();
        return;
      }
      const tags = [];
      if (variables?.eventId) {
        tags.push(["e", variables.eventId]);
      }
      // gets typesafe data when form is submitted
      let event: NostrEvent = {
        content: variables.data.text,
        kind: Kind.Text,
        tags: tags,
        created_at: dateToUnix(),
        pubkey: "",
      };
      if (windowNostr) {
        event = await signEventWindow.mutateAsync(event);
      } else {
        event.pubkey = identities[0].publicKey;
        event.id = getEventHash(event);
        event.sig = signEvent(event, identities[0].privateKey);
      }
      if (!event.id) {
        throw new Error("event.id is missing");
      }
      await publish.mutateAsync({ event });
      let eventFromDb = await api.getEvent(event.id);
      while (!eventFromDb) {
        await new Promise((r) => setTimeout(r, 2000));
        eventFromDb = await api.getEvent(event.id);
      }
      toast.success("Note sent");
    }
  );

  return {
    newNote,
  };
};

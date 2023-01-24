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

export const useNewEvent = () => {
  const { publish } = useNostrRelayPool();
  const identities = useAppStore.use.localProfiles();

  const newNote = useMutation(
    async (variables: {
      data: z.infer<typeof NewPostSchema>;
      eventId?: string;
    }) => {
      if (!identities[0]?.publicKey) {
        NoIdentitiesToast();
        return;
      }
      const tags = [];
      if (variables?.eventId) {
        tags.push(["e", variables.eventId]);
      }
      // gets typesafe data when form is submitted
      const event: NostrEvent = {
        content: variables.data.text,
        kind: Kind.Text,
        tags: tags,
        created_at: dateToUnix(),
        pubkey: identities[0].publicKey,
      };

      event.id = getEventHash(event);
      event.sig = signEvent(event, identities[0].privateKey);
      publish.mutate({ event });
      // wait untill the event appears in the database
      console.log("eventFromDb waiting for event to appear in db");
      let eventFromDb = await api.getEvent(event.id);
      console.log("eventFromDb", eventFromDb);
      while (!eventFromDb) {
        await new Promise((r) => setTimeout(r, 100));
        eventFromDb = await api.getEvent(event.id);
        console.log("eventFromDb", eventFromDb);
      }
      console.log("eventFromDb end", eventFromDb);
      toast.success("Note sent");
    }
  );

  return {
    newNote,
  };
};

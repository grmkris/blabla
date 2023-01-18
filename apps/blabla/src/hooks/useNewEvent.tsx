import type { Event as NostrEvent } from "nostr-tools/event";
import { getEventHash, Kind, signEvent } from "nostr-tools";
import { dateToUnix, useNostr } from "nostr-react";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import type { NewPostSchema } from "../components/NewPost";
import { useAppStore } from "../store/appStore";
import { api } from "../web-sqlite/sqlite";
import toast from "react-hot-toast";
import { useGlobalFeed } from "./useGlobalFeed";

export const useNewEvent = () => {
  const { publish } = useNostr();
  const { refresh } = useGlobalFeed();
  const identities = useAppStore.use.localProfiles();

  const newNote = useMutation(
    async (variables: {
      data: z.infer<typeof NewPostSchema>;
      eventId?: string;
    }) => {
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
      publish(event);
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

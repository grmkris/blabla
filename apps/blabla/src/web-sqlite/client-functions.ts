import { api } from "./sqlite";
import type { Note } from "../types";
import type { EventTable } from "./schema";
import { Tags } from "./schema";
import type { Event } from "nostr-tools";

export const insertOrUpdateEvents = async (events: Event[]) => {
  const tags: Tags[] = [];
  await api.createOrUpdateEvents(
    events.map((event) => {
      return {
        sig: "",
        tags: event.tags.map((tag) => {
          const tagDb = new Tags();
          tagDb.tag = tag[0];
          tagDb.value = tag[1];
          tagDb.id = event.id ?? "" + tag[0] ?? "" + tag[1];
          tagDb.event_id = event.id;
          tags.push(tagDb);
          return tagDb;
        }),
        created_at: event.created_at,
        content: event.content,
        kind: event.kind,
        id: event.id,
        pubkey: event.pubkey,
      };
    })
  );
  await api.createOrUpdateTags(tags);
};
export const eventToNoteMapper = (event: EventTable): Note => {
  const referencedNotes: string[] = [];
  const referencedProfiles: string[] = [];
  const referencedTags: string[] = [];
  console.debug("eventToNoteMapper", event);
  event.tags?.map((tag) => {
    // referencing profiles
    if (tag.tag === "p") {
      console.debug("referencing profile", tag);
      referencedProfiles.push(tag.value ?? "");
    }
    // referencing events
    if (tag.tag === "e") {
      console.debug("referencing event", tag);
      referencedNotes.push(tag.value ?? "");
    }
    // referencing hashtags
    if (tag.tag === "t") {
      console.debug("referencing tag", tag);
      referencedTags.push(tag.value ?? "");
    }
  });
  const note: Note = {
    event,
    referencedNotes: referencedNotes,
    referencedProfiles: referencedProfiles,
    referencedTags: referencedTags,
  };
  return note;
};

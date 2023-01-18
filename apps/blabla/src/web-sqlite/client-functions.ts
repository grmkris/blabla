import type { Event } from "nostr-tools";
import { api } from "./sqlite";
import type { Note } from "../types";

export const insertOrUpdateEvent = async (event: Event) => {
  const { id, pubkey, kind, created_at, content, sig, tags } = event;
  await api.createOrUpdateEvent({
    id,
    pubkey,
    kind,
    created_at,
    content,
    sig,
    tags_full: JSON.stringify(tags),
  });
  for (const tag of tags) {
    await api.createOrUpdateTag({
      tag: tag[0],
      event_id: id,
      value: tag[1],
    });
  }
};
export const eventToNoteMapper = (event: Event): Note => {
  const referencedNotes: string[] = [];
  const referencedProfiles: string[] = [];
  const referencedTags: string[] = [];
  console.debug("eventToNoteMapper", event);
  event.tags.map((tag) => {
    // referencing profiles
    if (tag[0] === "p" && tag[1]) {
      console.debug("referencing profile", tag);
      referencedProfiles.push(tag[1]);
    }
    // referencing events
    if (tag[0] === "e" && tag[1]) {
      console.debug("referencing event", tag);
      referencedNotes.push(tag[1]);
    }
    // referencing hashtags
    if (tag[0] === "t" && tag[1]) {
      console.debug("referencing tag", tag);
      referencedTags.push(tag[1]);
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

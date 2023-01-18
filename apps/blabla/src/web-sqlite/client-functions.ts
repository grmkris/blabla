import type { Event } from "nostr-tools";
import type { EventTable, NostrProfileTable, TagsTable } from "./schema";
import { exec } from "./sqlite";
import type { Note } from "../types";

export const insertOrUpdateEvent = async (event: Event) => {
  const { id, pubkey, kind, created_at, content, sig, tags } = event;
  console.log("insertOrUpdateEvent", event);
  try {
    const eventInsert: EventTable = {
      id,
      pubkey,
      kind,
      created_at,
      content,
      sig,
      tags_full: JSON.stringify(tags),
    };
    const result = await exec(eventInsert);
    console.log("insertOrUpdateEvent result", result);
  } catch (e) {
    console.error("insertOrUpdateEvent", e);
    return;
  }
  console.log("insertOrUpdateEvent", "tags", tags);
  for (const tag of tags) {
    const tagInsert: TagsTable = {
      tag: tag[0],
      event_id: id,
      value: tag[1],
    };
    await exec(tagInsert);
  }
  console.log("insertOrUpdateEvent", "done");
};

export const insertOrUpdateNostrProfile = async (
  profile: NostrProfileTable
) => {
  console.log("insertOrUpdateNostrProfile", profile);
  try {
    const result = await exec(profile);
    console.log("insertOrUpdateNostrProfile result", result);
  } catch (e) {
    console.error("insertOrUpdateNostrProfile", e);
    return;
  }
  console.log("insertOrUpdateNostrProfile", "done");
};

export const insertOrUpdateBookmark = async (eventId: string) => {
  console.log("insertOrUpdateBookmark", eventId);
  try {
    const result = await exec(eventId);
    console.log("insertOrUpdateBookmark result", result);
  } catch (e) {
    console.error("insertOrUpdateBookmark", e);
    return;
  }
  console.log("insertOrUpdateBookmark", "done");
};

export const deleteBookmark = async (note: Note) => {
  console.log("deleteBookmark", note);
  try {
    const result = await exec(note.event.id);
    console.log("deleteBookmark result", result);
  } catch (e) {
    console.error("deleteBookmark", e);
    return;
  }
  console.log("deleteBookmark", "done");
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

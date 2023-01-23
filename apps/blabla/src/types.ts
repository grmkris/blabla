// above is the enum version which we don't want to use, let's use the object version instead
import { z } from "zod";
import type { Event } from "nostr-tools";
import type { EventTable } from "./web-sqlite/schema";

export const EventKinds = {
  SET_METADATA: 0,
  TEXT_NOTE: 1,
  RECOMMEND_SERVER: 2,
  CONTACT_LIST: 3,
  ENCRYPTED_DIRECT_MESSAGE: 4,
  DELETE: 5,
  REACTION: 7,
  // Channels
  CHANNEL_CREATION: 40,
  CHANNEL_METADATA: 41,
  CHANNEL_MESSAGE: 42,
  CHANNEL_HIDE_MESSAGE: 43,
  CHANNEL_MUTE_USER: 44,
  CHANNEL_RESERVED_FIRST: 45,
  CHANNEL_RESERVED_LAST: 49,
  // Replaceable events
  REPLACEABLE_FIRST: 10000,
  REPLACEABLE_LAST: 19999,
  // Ephemeral events
  EPHEMERAL_FIRST: 20000,
  EPHEMERAL_LAST: 29999,
  // Parameterized replaceable events
  PARAMETERIZED_REPLACEABLE_FIRST: 30000,
  PARAMETERIZED_REPLACEABLE_LAST: 39999,
  USER_APPLICATION_FIRST: 40000,
  USER_APPLICATION_LAST: Number.MAX_SAFE_INTEGER,
} as const;

export type EventKind = (typeof EventKinds)[keyof typeof EventKinds];

export enum EventTags {
  Event = "e",
  Pubkey = "p",
  //  Multicast = 'm',
  Delegation = "delegation",
  Deduplication = "d",
}

export type Note = {
  event: EventTable;
  referencedNotes: string[];
  referencedProfiles: string[];
  referencedTags: string[];
};

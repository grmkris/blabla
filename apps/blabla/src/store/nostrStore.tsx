import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Event } from "nostr-tools";
import { createSelectors, LocalStateStorage } from "../utils/utils";
import type { NostrProfile } from "./appStore";

export type Note = {
  event: Event;
  referencedNotes: string[];
  referencedProfiles: string[];
  referencedTags: string[];
};

export type INostrStore = {
  data: {
    notes: Note[];
    profiles: NostrProfile[];
    lastUpdated: number;
  };
  newEvent: (event: Event) => void;
  addOrUpdateProfile: (profile: NostrProfile) => void;
};

export const useNostrStore = createSelectors(
  create<INostrStore>()(
    immer(
      devtools(
        persist(
          (set) => ({
            data: {
              notes: [],
              profiles: [],
              lastUpdated: 0,
            },
            newEvent: (event) => {
              set((state) => {
                state.data.notes.push(eventToNoteMapper(event));
              });
            },
            addOrUpdateProfile: (profile) => {
              set((state) => {
                const index = state.data.profiles.findIndex(
                  (p) => p.npub === profile.npub
                );
                if (index !== -1) {
                  state.data.profiles[index] = profile;
                } else {
                  state.data.profiles.push(profile);
                }
              });
            },
          }),
          {
            name: "nostrStore",
            getStorage: () => LocalStateStorage,
          }
        )
      )
    )
  )
);

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

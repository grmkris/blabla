import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Event } from "nostr-tools";
import { createSelectors, LocalStateStorage } from "../utils/utils";

const relays: NostrRelay[] = [
  "wss://nostream-production-6f68.up.railway.app",
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.ch",
].map((r) => ({ url: r, status: "idle" }));

export type NostrRelayStatus = "idle" | "connecting" | "connected" | "error";
export type NostrRelay = {
  url: string;
  status: NostrRelayStatus;
};

export type BlaBlaEvent = Event & { seen: boolean };
export type IBlaBlaNostrStore = {
  events: BlaBlaEvent[];
  addOrUpdateEvent: (event: BlaBlaEvent) => void;
};

export type NostrProfile = {
  pubkey: string;
  npub: string;
  name?: string | undefined;
  display_name?: string | undefined;
  picture?: string | undefined;
  about?: string | undefined;
  website?: string | undefined;
  lud06?: string | undefined;
  lud16?: string | undefined;
  nip06?: string | undefined;
};

export type NostrLocalProfile = {
  publicKey: string;
  privateKey: string;
};

export const useAppStore = createSelectors(
  create<IBlaBlaAppStore>()(
    immer(
      devtools(
        persist(
          (set) => ({
            localProfiles: [],
            saved: {
              nostrRelays: relays,
              events: [],
              profiles: [],
            },
            addOrUpdateLocalProfile: (identity) => {
              set((state) => {
                const index = state.localProfiles.findIndex(
                  (i) => i.publicKey === identity.publicKey
                );
                if (index !== -1) {
                  state.localProfiles[index] = identity;
                } else {
                  state.localProfiles.push(identity);
                }
              });
            },
            addOrUpdateNostrRelay: (relay) => {
              set((state) => {
                const index = state.saved.nostrRelays.findIndex(
                  (i) => i.url === relay.url
                );
                if (index !== -1) {
                  state.saved.nostrRelays[index] = relay;
                } else {
                  state.saved.nostrRelays.push(relay);
                }
              });
            },
            addOrUpdateSavedProfile: (profile) => {
              set((state) => {
                const index = state.saved.profiles.findIndex(
                  (i) => i.npub === profile.npub
                );
                if (index !== -1) {
                  state.saved.profiles[index] = profile;
                } else {
                  state.saved.profiles.push(profile);
                }
              });
            },
            addOrUpdateSavedEvent: (event) => {
              set((state) => {
                const index = state.saved.events.findIndex(
                  (i) => i.id === event.id
                );
                if (index !== -1) {
                  state.saved.events[index] = event;
                } else {
                  state.saved.events.push(event);
                }
              });
            },
            removeLocalProfile: (identity) => {
              set((state) => {
                state.localProfiles = state.localProfiles.filter(
                  (i) => i.publicKey !== identity.publicKey
                );
              });
            },
            removeNostrRelay: (relay) => {
              set((state) => {
                state.saved.nostrRelays = state.saved.nostrRelays.filter(
                  (i) => i.url !== relay.url
                );
              });
            },
            removeSavedProfile: (profile) => {
              set((state) => {
                state.saved.profiles = state.saved.profiles.filter(
                  (i) => i.npub !== profile.npub
                );
              });
            },
            removeSavedEvent: (event) => {
              set((state) => {
                state.saved.events = state.saved.events.filter(
                  (i) => i.id !== event.id
                );
              });
            },
          }),
          {
            name: "BlaBlaAppStorage",
            getStorage: () => LocalStateStorage,
          }
        )
      )
    )
  )
);

export interface IBlaBlaAppStore {
  localProfiles: NostrLocalProfile[];
  saved: {
    nostrRelays: NostrRelay[];
    profiles: NostrProfile[];
    events: BlaBlaEvent[];
  };
  addOrUpdateLocalProfile: (identity: NostrLocalProfile) => void;
  addOrUpdateNostrRelay: (relay: NostrRelay) => void;
  addOrUpdateSavedProfile: (profile: NostrProfile) => void;
  addOrUpdateSavedEvent: (event: BlaBlaEvent) => void;
  removeLocalProfile: (identity: Pick<NostrLocalProfile, "publicKey">) => void;
  removeNostrRelay: (relay: Pick<NostrRelay, "url">) => void;
  removeSavedProfile: (profile: NostrProfile) => void;
  removeSavedEvent: (event: BlaBlaEvent) => void;
}

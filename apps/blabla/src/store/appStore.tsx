import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
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
  };
  addOrUpdateLocalProfile: (identity: NostrLocalProfile) => void;
  addOrUpdateNostrRelay: (relay: NostrRelay) => void;
  removeNostrRelay: (relay: Pick<NostrRelay, "url">) => void;
}

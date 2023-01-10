import type { StoreApi, UseBoundStore } from "zustand";
import create from "zustand";
import type { StateStorage } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { del, get, set } from "idb-keyval";
import type { Identity } from "./components/Identity";
import type { Event } from "nostr-tools";

const relays1 = [
  "wss://nostr.bongbong.com",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr.cercatrova.me",
  "wss://relayer.fiatjaf.com",
  "wss://nostr.rocks",
  "wss://rsslay.fiatjaf.com",
  "wss://freedom-relay.herokuapp.com/ws",
  "wss://nostr-relay.freeberty.net",
  "wss://nostr.bitcoiner.social",
  "wss://nostr.nodeofsven.com",
  "wss://nostr-relay.wlvs.space",
  "wss://nostr.onsats.org",
  "wss://nostr-relay.untethr.me",
  "wss://nostr.semisol.dev",
  "wss://nostr-pub.semisol.dev",
  "ws://jgqaglhautb4k6e6i2g34jakxiemqp6z4wynlirltuukgkft2xuglmqd.onion",
  "wss://nostr-verified.wellorder.net",
  "wss://nostr.drss.io",
  "wss://nostr.unknown.place",
  "wss://relay.damus.io",
  "wss://nostr.openchain.fr",
  "wss://nostr.delo.software",
  "wss://relay.nostr.info",
  "wss://relay.minds.com/nostr/v1/ws",
  "wss://nostr.zaprite.io",
  "wss://nostr.oxtr.dev",
  "wss://nostr.ono.re",
  "wss://relay.grunch.dev",
  "wss://relay.cynsar.foundation",
  "wss://nostr.sandwich.farm",
  "wss://relay.nostr.ch",
  "wss://nostr.fmt.wiz.biz",
  "wss://nostr.einundzwanzig.space",
  "wss://nostr-relay.nonce.academy",
  "wss://nostr.nymsrelay.com",
  "wss://nostr.slothy.win",
  "wss://relay.stoner.com",
  "wss://nostr.mado.io",
  "wss://nostr.yael.at",
  "wss://jiggytom.ddns.net",
  "wss://nostr.mom",
  "wss://nostr.walletofsatoshi.com",
  "wss://nostr-relay.digitalmob.ro",
  "wss://nostr-2.zebedee.cloud",
  "wss://nostr.zebedee.cloud",
  "wss://nostr.f44.dev",
  "wss://nostr.orangepill.dev",
  "wss://nostr.coollamer.com",
];

const relays = [
  "wss://nostream-production-6f68.up.railway.app",
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.ch",
];

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export type NostrRelayStatus = "idle" | "connecting" | "connected" | "error";
export type NostrRelay = {
  id: string;
  url: string;
  status: NostrRelayStatus;
};

export type BlaBlaEvent = Event & { seen: boolean };
export type IBlaBlaNostrStore = {
  events: BlaBlaEvent[];
  addOrUpdateEvent: (event: BlaBlaEvent) => void;
};

export type IBlaBlaAppStore = {
  identities: Identity[];
  nostrRelays: NostrRelay[];
  following: Identity[];
  addFollowing: (identity: Identity) => void;
  removeFollowing: (identity: Identity) => void;
  addOrUpdateIdentity: (identity: Identity) => void;
  removeIdentity: (identity: Identity) => void;
  removeRelay: (index: number) => void;
  addOrUpdateRelay: (editInput: NostrRelay) => void;
};

const useAppStoreBase = create<IBlaBlaAppStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          identities: [],
          nostrRelays: relays.map((url) => {
            return {
              id: url,
              url,
              status: "idle",
            };
          }),
          following: [],
          addFollowing: (identity: Identity) => {
            set((state) => {
              state.following.push(identity);
            });
          },
          removeFollowing: (identity: Identity) => {
            set((state) => {
              state.following = state.following.filter(
                (i) => i.id !== identity.id
              );
            });
          },
          removeRelay: (index) =>
            set((state) => {
              state.nostrRelays.splice(index, 1);
            }),
          addOrUpdateRelay: (relay) =>
            set((state) => {
              const index = state.nostrRelays.findIndex(
                (s) => s.id === relay.id
              );
              if (index === -1) {
                state.nostrRelays.push(relay);
              } else {
                state.nostrRelays[index] = relay;
              }
            }),
          addOrUpdateIdentity: (identity) =>
            set((state) => {
              const index = state.identities.findIndex(
                (s) => s.id === identity.id
              );
              if (index === -1) {
                state.identities.push(identity);
              } else {
                state.identities[index] = identity;
              }
            }),
          removeIdentity: (identity) =>
            set((state) => {
              const index = state.identities.findIndex(
                (s) => s.id === identity.id
              );
              if (index !== -1) {
                state.identities.splice(index, 1);
              }
            }),
        }),
        {
          name: "BlaBlaAppStorage",
          getStorage: () => storage,
        }
      )
    )
  )
);

const useNostrStoreBase = create<IBlaBlaNostrStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          events: [],
          addOrUpdateEvent: (event) =>
            set((state) => {
              const index = state.events.findIndex((s) => s.id === event.id);
              if (index === -1) {
                state.events.push(event);
              } else {
                state.events[index] = event;
              }
            }),
        }),
        {
          name: "BlaBlaNostrStorage",
        }
      )
    )
  )
);

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const useAppStore = createSelectors(useAppStoreBase);
export const useNostrStore = createSelectors(useNostrStoreBase);

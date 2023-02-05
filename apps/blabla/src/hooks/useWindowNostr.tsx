import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Event } from "nostr-tools";
import { createSelectors, LocalStateStorage } from "../utils";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { useNostrRelayPool } from "./nostr-relay-pool/useNostrRelayPool";
import { Author } from "nostr-relaypool";
import { useAuthor } from "./nostr-relay-pool/useAuthor";

export interface IWindowNostrStore {
  data: {
    pubKey?: string;
    followers: string[];
    following: string[];
  };
  updateFollowers: (followers: string[]) => void;
  updateFollowing: (following: string[]) => void;
  updatePubKey: (pubKey: string) => void;
}

export const useWindowNostrStore = createSelectors(
  create<IWindowNostrStore>()(
    immer(
      devtools(
        persist(
          (set) => ({
            data: {
              pubKey: undefined,
              followers: [],
              following: [],
            },
            updateFollowers: (followers) => {
              set((state) => {
                state.data.followers = followers;
              });
            },
            updateFollowing: (following) => {
              set((state) => {
                state.data.following = following;
              });
            },
            updatePubKey: (pubKey) => {
              set((state) => {
                state.data.pubKey = pubKey;
              });
            },
          }),
          {
            name: "BlaBlaSettingsStorage",
            getStorage: () => LocalStateStorage,
          }
        )
      )
    )
  )
);

interface NostrProvider {
  getPublicKey: () => Promise<string>;
  signEvent: (
    event: Pick<Event, "kind" | "tags" | "content" | "created_at">
  ) => Promise<Event>;
  getRelays: () => Promise<{
    [url: string]: { read: boolean; write: boolean };
  }>;
  nip04: {
    encrypt: (pubkey: string, plaintext: string) => Promise<string>;
    decrypt: (pubkey: string, ciphertext: string) => Promise<string>;
  };
}

declare global {
  interface Window {
    nostr: NostrProvider;
  }
}

/**
 * https://github.com/nostr-protocol/nips/blob/master/07.md
 */
export const useWindowNostr = () => {
  const [windowNostr, setWindowNostr] = useState(false);
  const { pubKey, followers, following } = useWindowNostrStore.use.data();
  const updatePubKey = useWindowNostrStore.use.updatePubKey();
  const updateFollowing = useWindowNostrStore.use.updateFollowing();
  const updateFollowers = useWindowNostrStore.use.updateFollowers();
  const { relayPool, nostrRelays } = useNostrRelayPool();

  useEffect(() => {
    if (typeof window?.nostr !== "undefined") {
      setWindowNostr(true);
    }
    if (pubKey && relayPool) {
      const author = new Author(relayPool, nostrRelays, pubKey);
      const cbFollowing = (following: string[]) => {
        updateFollowing(following);
      };
      const cbFollowers = (event: Event) => {
        updateFollowers([...followers, event.pubkey]);
      };
      author.followsPubkeys(cbFollowing, 1000);
      author.followers(cbFollowers, 1000, 1000);
    }
  }, [relayPool]);

  const connect = useMutation({
    mutationFn: async () => {
      if (!!pubKey) throw new Error("Already connected");
      if (!windowNostr) throw new Error("Nostr Signer not available");
      if (!relayPool) throw new Error("Nostr Relay Pool not available");
      const _pubkey = await window.nostr.getPublicKey();
      updatePubKey(_pubkey);

      const author = new Author(relayPool, nostrRelays, _pubkey);

      const cbFollowing = (following: string[]) => {
        updateFollowing(following);
      };
      const cbFollowers = (event: Event) => {
        updateFollowers([...followers, event.pubkey]);
      };
      author.followsPubkeys(cbFollowing, 1000);
      author.followers(cbFollowers, 1000, 1000);
    },
  });

  const signEvent = useMutation({
    mutationFn: async (
      event: Pick<Event, "kind" | "tags" | "content" | "created_at">
    ) => {
      if (!windowNostr) throw new Error("Nostr Signer not available");
      return await window.nostr.signEvent(event);
    },
  });

  const getRelays = useQuery({
    queryKey: ["getRelays"],
    queryFn: async () => {
      if (windowNostr) {
        return await window.nostr.getRelays();
      }
    },
    enabled: windowNostr,
  });

  const nip04Encrypt = useMutation({
    mutationFn: async (variables: { pubkey: string; plaintext: string }) => {
      if (windowNostr) {
        const { pubkey, plaintext } = variables;
        return await window.nostr.nip04.encrypt(pubkey, plaintext);
      }
    },
  });

  const nip04Decrypt = useMutation({
    mutationFn: async (variables: { pubkey: string; ciphertext: string }) => {
      if (windowNostr) {
        const { pubkey, ciphertext } = variables;
        return await window.nostr.nip04.decrypt(pubkey, ciphertext);
      }
    },
  });

  return {
    windowNostr,
    signEvent,
    getRelays,
    nip04Encrypt,
    nip04Decrypt,
    connect,
    pubKey,
    followers,
    following,
  };
};

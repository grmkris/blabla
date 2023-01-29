import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Event } from "nostr-tools";

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

  useEffect(() => {
    if (typeof window?.nostr !== "undefined") {
      setWindowNostr(true);
    }
  }, []);

  const getPublicKey = useMutation({
    mutationFn: async () => {
      if (windowNostr) {
        return await window.nostr.getPublicKey();
      }
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
    getPublicKey,
    signEvent,
    getRelays,
    nip04Encrypt,
    nip04Decrypt,
  };
};

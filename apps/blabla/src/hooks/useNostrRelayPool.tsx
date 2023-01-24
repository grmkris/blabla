import { Author } from "nostr-relaypool";
import type { Filter, Event } from "nostr-tools";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { insertOrUpdateEvents } from "../web-sqlite/client-functions";
import { api } from "../web-sqlite/sqlite";
import { NostrSocketContext } from "../NostrSocketContext";
import { EventKinds } from "../types";
import { useAppStore } from "../AppStore";

export const useNostrRelayPool = () => {
  const { relayPool } = useContext(NostrSocketContext);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const now = useRef(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!relayPool || subscribed) return;
    console.log("useNostrRelayPool: useEffect", relayPool);
    relayPool.subscribe(
      [
        {
          since: now.current - 1000, // all new events from now
          kinds: [EventKinds.TEXT_NOTE],
        },
      ],
      nostrRelays,
      (event, isAfterEose) => isAfterEose && insertOrUpdateEvents([event]),
      undefined,
      (events) => insertOrUpdateEvents(events ?? []),
      { allowDuplicateEvents: false, allowOlderEvents: true }
    );
    setSubscribed(true);
  }, []);

  const getNostrData = useMutation(async (variables: { filter: Filter[] }) => {
    if (!relayPool) {
      throw new Error("No relay pool");
    }
    relayPool.subscribe(
      variables.filter,
      nostrRelays,
      (event, isAfterEose, relayURL) =>
        isAfterEose && insertOrUpdateEvents([event]),
      undefined,
      async (events, url) => insertOrUpdateEvents(events ?? [])
    );
    relayPool.onerror((err, relayUrl) => {
      console.log("RelayPool error", err, " from relay ", relayUrl);
    });
    relayPool.onnotice((relayUrl, notice) => {
      console.log("RelayPool notice", notice, " from relay ", relayUrl);
    });
  });

  const publish = useMutation(async (variables: { event: Event }) => {
    relayPool?.publish(variables.event, nostrRelays);
  });

  const author = useMutation(async (variables: { author: string }) => {
    if (!relayPool || !variables.author) return;
    const author = new Author(relayPool, nostrRelays, variables.author);
    console.log("author123567", author, variables.author, nostrRelays);
    author.text(
      (event) => {
        insertOrUpdateEvents([event]);
        console.log("author.text", event);
      },
      100,
      100
    );
    author.follows((author) => {
      console.log("follows-todo", author);
      api.insertFollowers(
        author.map((x) => ({
          pubkey: x.pubkey,
          followedPubkey: variables.author,
        }))
      );
    }, 100);
    author.followers(
      (event) => {
        console.log("followers-todo", event);
        api.insertFollowers([
          {
            pubkey: variables.author,
            followedPubkey: event.pubkey,
          },
        ]);
      },
      100,
      100
    );
    author.followsPubkeys(
      (pubkey) => console.log("followsPubkeys-todo", pubkey),
      100
    );
    author.metaData((metaData) => {
      console.log("metaData-todo", metaData);
    }, 100);
    author.referenced(
      (event) => {
        console.log("referenced-todo", event);
      },
      100,
      100
    );
  });

  const getEventById = useMutation(async (variables: { id: string }) => {
    if (!relayPool) return;
    return await relayPool.getEventById(variables.id, nostrRelays, 1000);
  });

  return {
    getNostrData,
    publish,
    author,
    relays: relayPool?.relayByUrl,
    getEventById,
  };
};

export const dateToUnix = (_date?: Date) => {
  const date = _date || new Date();

  return Math.floor(date.getTime() / 1000);
};

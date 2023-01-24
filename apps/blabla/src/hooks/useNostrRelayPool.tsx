import { Author } from "nostr-relaypool";
import type { Filter, Event } from "nostr-tools";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { insertOrUpdateEvents } from "../web-sqlite/client-functions";
import { api } from "../web-sqlite/sqlite";
import { NostrSocketContext } from "../NostrSocketContext";
import { useAppStore } from "../AppStore";
import { NostrProfileTableSchema } from "../web-sqlite/schema";

export const useNostrRelayPool = () => {
  const { relayPool } = useContext(NostrSocketContext);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);

  const getNostrData = useMutation(async (variables: { filter: Filter[] }) => {
    if (!relayPool) return;
    relayPool.subscribe(
      variables.filter,
      nostrRelays,
      (event, isAfterEose, relayURL) => {
        insertOrUpdateEvents([event]);
        console.log("useNostrRelayPool: getNostrData: event", event);
      },
      500,
      undefined
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
        // insertOrUpdateEvents([event]);
        // console.log("author.text", event);
      },
      10,
      10
    );
    author.follows((author) => {
      // console.log("author.follows", author);
      // api.insertFollowers(
      //         variables.author,
      //         author.map((x) => x.pubkey)
      //       );
    }, 100);
    author.followers(
      (event) => {
        // console.log("author.followers", event);
        /*api.insertFollowers([
          {
            pubkey: variables.author,
            followedPubkey: event.pubkey,
          },
        ]);*/
      },
      10,
      100
    );
    author.followsPubkeys((pubkey) => {
      // console.log("author.followsPubkeys", pubkey)
    }, 100);
    author.metaData((metaData) => {
      if (metaData.pubkey !== variables.author) {
        console.warn(
          "metadata event and requested pubkey author does not match",
          metaData.pubkey,
          variables.author
        );
        return;
      }
      const metadataObj = NostrProfileTableSchema.safeParse({
        pubkey: variables.author,
        ...JSON.parse(metaData.content),
      });
      if (metadataObj.success) {
        console.log("author.metadata metadataObj", metadataObj);
        api.createOrUpdateNostrProfile([metadataObj.data]);
      } else {
        console.warn("author.metadata metadataObj fail", metadataObj);
      }
    }, 100);
    author.referenced(
      (event) => {
        // console.log("author.referenced", event);
      },
      10,
      10
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

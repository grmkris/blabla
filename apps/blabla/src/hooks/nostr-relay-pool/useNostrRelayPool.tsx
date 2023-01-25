import { Author, collect } from "nostr-relaypool";
import type { Filter, Event } from "nostr-tools";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertOrUpdateEvents } from "../../web-sqlite/client-functions";
import { api } from "../../web-sqlite/sqlite";
import { NostrSocketContext } from "../../NostrSocketContext";
import { useAppStore } from "../../AppStore";
import { NostrProfileTableSchema } from "../../web-sqlite/schema";

export const useNostrRelayPool = () => {
  const { relayPool } = useContext(NostrSocketContext);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const queryClient = useQueryClient();

  const getNostrData = useMutation(async (variables: { filter: Filter[] }) => {
    if (!relayPool) return;
    relayPool.subscribe(
      variables.filter,
      nostrRelays,
      (event, isAfterEose, relayURL) => {
        // insertOrUpdateEvents([event]);
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

  const retrievePubkeyMetadata = async (variables: { author: string }) => {
    if (!relayPool || !variables.author) return;
    const author = new Author(relayPool, nostrRelays, variables.author);
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
        queryClient.invalidateQueries([], {
          predicate: (query) => query.queryKey.includes(variables.author),
        });
      } else {
        console.warn("author.metadata metadataObj fail", metadataObj);
      }
    }, 100);
  };

  const retrievePubkeyInfos = useMutation(
    async (variables: { author: string }) => {
      console.log("retrievePubkeyInfos", variables);
      if (!relayPool || !variables.author) return;
      const author = new Author(relayPool, nostrRelays, variables.author);

      const filterAndSaveFollowers = (events: Event[]) => {
        const event = events[0];
        console.log("author.followers", event);
        if (event.pubkey !== variables.author) {
          console.warn(
            "followers event and requested pubkey author does not match",
            event.pubkey,
            variables.author
          );
          return;
        }
        api.updateFollowers({
          pubkey: variables.author,
          followers: event.tags.map((tag) => {
            return tag[1];
          }),
        });
      };

      const onCollect = async (events: Event[]) => {
        await insertOrUpdateEvents(events);
        queryClient.invalidateQueries(["eventsByPubkey"]);
      };

      author.text(collect(onCollect), 20, 500);
      author.followers(collect(filterAndSaveFollowers), 20, 500);
      author.followsPubkeys((pubkey) => {
        console.log("author.followsPubkeys", pubkey);
        const follows = pubkey.map((pubkey) => ({
          pubkey: pubkey,
          followers: [variables.author],
        }));
        follows.forEach((follow) => {
          api.updateFollowers({
            pubkey: follow.pubkey,
            followers: [variables.author],
          });
        });
      }, 500);
    }
  );

  const getEventById = useMutation(async (variables: { id: string }) => {
    if (!relayPool) return;
    return await relayPool.getEventById(variables.id, nostrRelays, 1000);
  });

  return {
    getNostrData,
    publish,
    retrievePubkeyInfos,
    retrievePubkeyMetadata,
    relays: relayPool?.relayByUrl,
    getEventById,
  };
};

export const dateToUnix = (_date?: Date) => {
  const date = _date || new Date();

  return Math.floor(date.getTime() / 1000);
};

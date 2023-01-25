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

  const onCollect = (events: Event[]) => {
    console.log("useNostrRelayPool: onCollect", events);
    insertOrUpdateEvents(events);
  };

  const getNostrData = useMutation(async (variables: { filter: Filter[] }) => {
    if (!relayPool) return;
    relayPool.subscribe(variables.filter, nostrRelays, collect(onCollect), 500);
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

      const filterAndSaveFollowers = async (event: Event) => {
        console.log("author.followers filterAndSaveFollowers", {
          event,
          variables,
        });
        await api.updateFollowers({
          pubkey: variables.author,
          followers: [event.pubkey],
        });
        await queryClient.invalidateQueries(["getFollowers", variables.author]);
        await queryClient.invalidateQueries([
          "getFollowersCount",
          variables.author,
        ]);
      };

      const onCollect = async (events: Event[]) => {
        console.log("author.followers onCollect", events);
        if (events.length === 20) {
          await insertOrUpdateEvents(events);
          await queryClient.invalidateQueries([
            "eventsByPubkey",
            variables.author,
          ]);
        }
      };

      author.text(collect(onCollect), 20, 200);
      author.followers(filterAndSaveFollowers, undefined, 200);
      author.followsPubkeys(async (pubkey) => {
        const follows = pubkey.map((pubkey) => ({
          pubkey: pubkey,
          followers: [variables.author],
        }));
        await Promise.all(
          follows.map((follow) =>
            api.updateFollowers({
              pubkey: follow.pubkey,
              followers: [variables.author],
            })
          )
        );
        await queryClient.invalidateQueries(["getFollowing", variables.author]);
        await queryClient.invalidateQueries([
          "getFollowingCount",
          variables.author,
        ]);
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

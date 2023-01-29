import { Author, collect } from "nostr-relaypool";
import type { Filter, Event } from "nostr-tools";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../web-sqlite/sqlite";
import { NostrSocketContext } from "../../NostrSocketContext";
import { useAppStore } from "../../AppStore";
import type { NostrProfileTable } from "../../web-sqlite/schema";
import { NostrProfileTableSchema } from "../../web-sqlite/schema";
import { insertOrUpdateEvents } from "../../web-sqlite/client-functions";
import { Kind } from "nostr-tools";

export const useNostrRelayPool = () => {
  const { relayPool } = useContext(NostrSocketContext);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const queryClient = useQueryClient();

  const getPostComments = useMutation(
    async (variables: {
      filter: Filter[];
      batch?: number;
      onEvent?: (event: Event) => void;
      onEose?: (events?: Event[]) => void;
    }) => {
      if (!relayPool) return;
      const onEvent = (event: Event, write?: boolean) => {
        console.log("getNostrData.onEvent", event);
      };

      relayPool.subscribe(
        variables.filter,
        nostrRelays,
        variables.onEvent ?? onEvent,
        variables.onEose ? undefined : 100,
        variables.onEose
      );
      relayPool.onerror((err, relayUrl) => {
        console.error("useNostrRelayPool error", err, " from relay ", relayUrl);
      });
      relayPool.onnotice((relayUrl, notice) => {
        console.warn(
          "useNostrRelayPool notice",
          notice,
          " from relay ",
          relayUrl
        );
      });
    }
  );

  const publish = useMutation(async (variables: { event: Event }) => {
    relayPool?.publish(variables.event, nostrRelays);
  });

  const retrievePubkeyMetadata = useMutation(
    async (variables: { author: string }) => {
      console.log("retrievePubkeyMetadata", variables.author);
      if (!relayPool || !variables.author) {
        console.warn(
          "retrievePubkeyMetadata useNostrRelayPool: no relayPool or author"
        );
        return;
      }
      return new Promise<NostrProfileTable>((resolve, reject) => {
        const author = new Author(relayPool, nostrRelays, variables.author);
        author.metaData(async (metaData) => {
          console.log("author.metadata", metaData);
          if (metaData.pubkey !== variables.author) {
            console.warn(
              "useNostrRelayPool: metadata event and requested pubkey author does not match",
              metaData.pubkey,
              variables.author
            );
            reject(
              "useNostrRelayPool: metadata event and requested pubkey author does not match"
            );
            return;
          }
          const metadataObj = NostrProfileTableSchema.safeParse({
            pubkey: variables.author,
            ...JSON.parse(metaData.content),
          });
          if (!metadataObj.success) {
            console.warn("author.metadata metadataObj fail", metadataObj);
            reject("author.metadata metadataObj fail");
            return;
          }
          if (metadataObj.success) {
            console.log(
              "author.metadata metadataObj success",
              metadataObj.data
            );
            await api.createOrUpdateNostrProfile([metadataObj.data]);
            resolve(metadataObj.data);
            return;
          } else {
            console.warn("author.metadata metadataObj fail", metadataObj);
            reject("author.metadata metadataObj fail");
          }
        }, 0);
      });
    }
  );

  const retrievePubkeyInfos = useMutation(
    async (variables: { author: string }) => {
      if (!relayPool || !variables.author) return;
      const author = new Author(relayPool, nostrRelays, variables.author);

      const filterAndSaveFollowers = async (events: Event[]) => {
        console.log("filterAndSaveFollowers", events.length);
        if (events.length % 10 === 0) {
          const eventsNew = events.slice(0, 10);
          await api.updateFollowers({
            pubkey: variables.author,
            followers: eventsNew.map((event) => event.pubkey),
          });
          await queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
              (queryKey[0] === "usePubkeyFollowersCount" &&
                queryKey[1] === variables.author) ||
              (queryKey[0] === "usePubkeyFollowers" &&
                queryKey[1] === variables.author),
          });
        }
      };

      // get author followers
      author.followers(collect(filterAndSaveFollowers), undefined, Infinity);
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
        await Promise.all([
          await queryClient.invalidateQueries([
            "usePubkeyFollowing",
            variables.author,
          ]),
          await queryClient.invalidateQueries([
            "usePubkeyFollowingCount",
            variables.author,
          ]),
        ]);
      }, 500);
    }
  );

  const getEventById = useMutation(async (variables: { id: string }) => {
    if (!relayPool) return;
    return await relayPool.getEventById(variables.id, nostrRelays, 1000);
  });

  const retrievePubkeyTexts = useMutation(
    async (variables: { author: string; since?: number }) => {
      if (!relayPool) return;
      const onCollect = async (events: Event[]) => {
        console.log(
          "retrievePubkeyTexts.onCollect:" + variables.author,
          events.length
        );
        if (events.length % 10 === 0) {
          await insertOrUpdateEvents(events.splice(0, 10));
        }
      };
      relayPool.subscribe(
        [
          {
            since:
              variables.since ?? dateToUnix(new Date()) - 60 * 60 * 24 * 30,
            authors: [variables.author],
            kinds: [Kind.Text],
          },
        ],
        nostrRelays,
        collect(onCollect),
        undefined,
        undefined
      );
    }
  );

  return {
    publish,
    retrievePubkeyInfos,
    retrievePubkeyMetadata,
    nostrRelays,
    relays: relayPool?.relayByUrl,
    getEventById,
    ready: !!relayPool,
    retrievePubkeyTexts,
    getPostComments,
    relayPool,
  };
};

export const dateToUnix = (_date?: Date) => {
  const date = _date || new Date();

  return Math.floor(date.getTime() / 1000);
};

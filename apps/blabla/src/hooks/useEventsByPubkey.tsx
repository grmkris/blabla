import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import {
  dateToUnix,
  useNostrRelayPool,
} from "./nostr-relay-pool/useNostrRelayPool";

export const useEventsByPubkey = (props: { pubkey: string }) => {
  const PAGE_SIZE = 15;
  const { retrievePubkeyTexts } = useNostrRelayPool();
  const eventsByPubkey = useInfiniteQuery({
    queryKey: ["eventsByPubkey", props.pubkey],
    queryFn: async ({ pageParam = 0 }) => {
      const events = await api.getEvents({
        filter: "pubkey",
        filter_value: props.pubkey,
        limit: PAGE_SIZE,
        order: "DESC",
        filter_operator: "=",
        offset: pageParam,
        order_by: "event.created_at",
      });
      if (pageParam === 0) {
        // if we are on the first page and latest event is not in last
        retrievePubkeyTexts.mutate({
          author: [props.pubkey],
        });
      }
      return events.map((x) => eventToNoteMapper(x));
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
  });

  return {
    eventsByPubkey,
  };
};

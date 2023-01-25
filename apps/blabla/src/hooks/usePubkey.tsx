import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { eventToNoteMapper } from "../web-sqlite/client-functions";

export const usePubkey = (props: { pubkey: string }) => {
  const PAGE_SIZE = 20;
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
        order_by: "created_at",
      });
      return events.map((x) => eventToNoteMapper(x));
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
  });

  const getFollowers = useQuery({
    queryKey: ["getFollowers", props.pubkey],
    queryFn: async () => {
      return await api.getFollowers(props.pubkey);
    },
    refetchInterval: false,
  });

  const getFollowing = useQuery({
    queryKey: ["getFollowing", props.pubkey],
    queryFn: async () => {
      return await api.getFollowing(props.pubkey);
    },
    refetchInterval: false,
  });

  const getFollowersCount = useQuery({
    queryKey: ["getFollowersCount", props.pubkey],
    queryFn: async () => {
      return await api.getFollowersCount(props.pubkey);
    },
    refetchInterval: false,
  });
  const getFollowingCount = useQuery({
    queryKey: ["getFollowingCount", props.pubkey],
    queryFn: async () => {
      return await api.getFollowingCount(props.pubkey);
    },
    refetchInterval: false,
  });

  return {
    eventsByPubkey,
    getFollowers,
    getFollowing,
    getFollowersCount,
    getFollowingCount,
  };
};

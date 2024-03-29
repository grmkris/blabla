import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useContext, useEffect } from "react";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import { NostrSocketContext } from "../NostrSocketContext";
import { useProfiles } from "./useProfiles";
import { useWindowNostr } from "./useWindowNostr";
import { useNostrRelayPool } from "./nostr-relay-pool/useNostrRelayPool";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  const { now, refreshNow } = useContext(NostrSocketContext);

  const globalFeed = useInfiniteQuery({
    queryKey: ["globalFeed", now],
    queryFn: async ({ pageParam = now }) => {
      const events = await api.getGlobalFeed({
        pageParam,
        pageSize: PAGE_SIZE,
      });
      console.log("useGlobalFeed- events", events);
      return events.map((x) => eventToNoteMapper(x));
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[PAGE_SIZE - 1]?.event.created_at
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE
        ? firstPage[0]?.event.created_at
        : undefined;
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    networkMode: "always",
  });

  const refresh = useMutation(async () => {
    await refreshNow();
  });

  return {
    globalFeed,
    refresh,
    now,
  };
};

export const useBookmarksFeed = () => {
  const { now, refreshNow } = useContext(NostrSocketContext);
  const { bookmarkedProfiles } = useProfiles();
  const bookmarksFeed = useInfiniteQuery({
    queryKey: ["bookmarksFeed", now],
    queryFn: async ({ pageParam = now }) => {
      const events = await api.getEventsByPubkeys({
        pageParam,
        pageSize: PAGE_SIZE,
        pubkeys: bookmarkedProfiles.data?.map((x) => x.pubkey ?? "") || [],
      });
      return events.map((x) => eventToNoteMapper(x));
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[PAGE_SIZE - 1]?.event.created_at
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE
        ? firstPage[0]?.event.created_at
        : undefined;
    },
    refetchInterval: false,
  });

  const numberOfNewItems = useQuery({
    queryKey: [
      "bookmarksFeed",
      "numberOfNewItems",
      now,
      bookmarkedProfiles.data?.map((x) => x.pubkey),
    ],
    queryFn: async () => {
      return await api.getNewPostsCount({
        created_at: now,
        pubkeys: bookmarkedProfiles.data?.map((x) => x.pubkey ?? ""),
      });
    },
    refetchInterval: 3000,
  });

  const refresh = useMutation(async () => {
    await refreshNow();
  });

  return {
    bookmarksFeed,
    numberOfNewItems,
    refresh,
    now,
  };
};

export const useNumberOfNewItems = () => {
  const { now } = useContext(NostrSocketContext);

  const numberOfNewItems = useQuery({
    queryKey: ["globalFeed", "numberOfNewItems", now],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now });
    },
    refetchInterval: 3000,
  });

  return {
    numberOfNewItems,
  };
};

export const useFollowsFeed = () => {
  const { now, refreshNow } = useContext(NostrSocketContext);
  const { following, pubKey } = useWindowNostr();
  const { retrievePubkeyTexts } = useNostrRelayPool();

  // get new events from relay
  useEffect(() => {
    if (!retrievePubkeyTexts.isSuccess) {
      retrievePubkeyTexts.mutateAsync({
        author: following,
      });
    }
  }, [following, retrievePubkeyTexts]);

  const followsFeed = useInfiniteQuery({
    queryKey: ["followsFeed", now],
    queryFn: async ({ pageParam = now }) => {
      const events = await api.getEventsByPubkeys({
        pageParam,
        pageSize: PAGE_SIZE,
        pubkeys: following,
      });
      return events.map((x) => eventToNoteMapper(x));
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[PAGE_SIZE - 1]?.event.created_at
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE
        ? firstPage[0]?.event.created_at
        : undefined;
    },
    refetchInterval: false,
    enabled: !!pubKey,
  });

  const numberOfNewItems = useQuery({
    queryKey: ["followsFeed", "numberOfNewItems", now],
    queryFn: async () => {
      return await api.getNewPostsCount({
        created_at: now,
        pubkeys: following,
      });
    },
    refetchInterval: 3000,
  });

  const refresh = useMutation(async () => {
    await refreshNow();
  });

  return {
    followsFeed,
    numberOfNewItems,
    refresh,
    now,
  };
};

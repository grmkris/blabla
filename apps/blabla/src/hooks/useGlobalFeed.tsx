import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useContext } from "react";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import { useSqlite } from "./useSqlite";
import { NostrSocketContext } from "../NostrSocketContext";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  const { now, refreshNow } = useContext(NostrSocketContext);

  const globalFeed = useInfiniteQuery({
    queryKey: ["globalFeed", now],
    queryFn: async ({ pageParam = now }) => {
      const tags = await api.getTags();
      console.log("useGlobalFeed- tags", tags);
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
    networkMode: "always",
  });

  const numberOfNewItems = useQuery({
    queryKey: ["globalFeed", "numberOfNewItems", now],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now });
    },
    refetchInterval: 3000,
  });

  const refresh = useMutation(async () => {
    await refreshNow();
    await globalFeed.refetch();
  });

  return {
    globalFeed,
    numberOfNewItems,
    refresh,
    now,
  };
};

export const useBookmarksFeed = () => {
  const { now } = useContext(NostrSocketContext);
  const { bookmarkedProfiles } = useSqlite({});
  const queryCLient = useQueryClient();
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
    queryKey: ["bookmarksFeed", "numberOfNewItems", now],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now });
    },
    refetchInterval: 3000,
  });

  const refresh = async () => {
    await queryCLient.invalidateQueries();
    await bookmarksFeed.refetch();
  };

  return {
    bookmarksFeed,
    numberOfNewItems,
    refresh,
    now,
  };
};

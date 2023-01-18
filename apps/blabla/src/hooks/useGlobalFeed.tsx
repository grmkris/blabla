import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useRef } from "react";
import { dateToUnix } from "nostr-react";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import { useSqlite } from "./useSqlite";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  const now = useRef(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const queryCLient = useQueryClient();
  const globalFeed = useInfiniteQuery({
    queryKey: ["globalFeed"],
    queryFn: async ({ pageParam = now.current }) => {
      const events = await api.getGlobalFeed({
        pageParam,
        pageSize: PAGE_SIZE,
      });
      return events.map((x) =>
        eventToNoteMapper({
          pubkey: x.pubkey,
          tags: JSON.parse(x.tags_full),
          sig: x.sig,
          content: x.content,
          created_at: x.created_at,
          kind: x.kind,
          id: x.id,
        })
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[PAGE_SIZE - 1]?.event.created_at
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE
        ? firstPage[0].event.created_at
        : undefined;
    },
    refetchInterval: false,
  });

  const numberOfNewItems = useQuery({
    queryKey: ["numberOfNewItems", now.current],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now.current });
    },
    refetchInterval: 3000,
  });

  const refresh = async () => {
    now.current = dateToUnix(new Date());
    await queryCLient.invalidateQueries();
    await globalFeed.refetch();
  };

  return {
    globalFeed,
    numberOfNewItems,
    refresh,
    now,
  };
};

export const useBookmarksFeed = () => {
  const now = useRef(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const { bookmarkedProfiles } = useSqlite({});
  const queryCLient = useQueryClient();
  const bookmarksFeed = useInfiniteQuery({
    queryKey: ["bookmarksFeed"],
    queryFn: async ({ pageParam = now.current }) => {
      const events = await api.getEventsByPubkeys({
        pageParam,
        pageSize: PAGE_SIZE,
        pubkeys: bookmarkedProfiles.data?.map((x) => x.pubkey) || [],
      });
      return events.map((x) =>
        eventToNoteMapper({
          pubkey: x.pubkey,
          tags: JSON.parse(x.tags_full),
          sig: x.sig,
          content: x.content,
          created_at: x.created_at,
          kind: x.kind,
          id: x.id,
        })
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE
        ? lastPage[PAGE_SIZE - 1]?.event.created_at
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE
        ? firstPage[0].event.created_at
        : undefined;
    },
    refetchInterval: false,
  });

  const numberOfNewItems = useQuery({
    queryKey: ["numberOfNewItems", now.current],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now.current });
    },
    refetchInterval: 3000,
  });

  const refresh = async () => {
    now.current = dateToUnix(new Date());
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

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useRef } from "react";
import { dateToUnix } from "nostr-react";
import { eventToNoteMapper } from "../web-sqlite/client-functions";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  const now = useRef(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const queryCLient = useQueryClient();
  console.log("USING NOW", now.current);
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
  });

  const numberOfNewItems = useQuery({
    queryKey: ["numberOfNewItems", now.current],
    queryFn: async () => {
      return await api.getNewPostsCount({ created_at: now.current });
    },
    refetchInterval: 3000,
  });

  const refresh = () => {
    now.current = dateToUnix(new Date());
    queryCLient.invalidateQueries();
  };

  return {
    globalFeed,
    numberOfNewItems,
    refresh,
  };
};

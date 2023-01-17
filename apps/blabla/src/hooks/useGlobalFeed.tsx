import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get } from "../sqlite";
import type { EventTable } from "../types";
import { EventTableSchema } from "../types";
import { eventToNoteMapper } from "../store/nostrStore";
import { useRef } from "react";
import { dateToUnix } from "nostr-react";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  const now = useRef(dateToUnix(new Date())); // Make sure current time isn't re-rendered
  const queryCLient = useQueryClient();
  console.log("USING NOW", now.current);
  const globalFeed = useInfiniteQuery({
    queryKey: ["globalFeed"],
    queryFn: async ({ pageParam = now.current }) => {
      const select = `select * from events where created_at < ${pageParam} order by created_at desc limit ${PAGE_SIZE}`;
      console.log("Select statement", select);
      const res1 = (await get(select)) as any[];
      const events: EventTable[] = res1[0].map((x) =>
        EventTableSchema.parse(x)
      );
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
    queryKey: ["numberOfNewItems"],
    queryFn: async () => {
      const select = `select count(*) from events where created_at > ${now.current}`;
      const res1 = (await get(select)) as any[];
      const count = res1[0][0]["count(*)"];
      console.log("numberOfNewItems", count, now.current);
      console.log("numberOfNewItems", count);
      return count;
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

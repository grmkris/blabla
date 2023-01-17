import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../sqlite";
import type { EventTable } from "../types";
import { EventTableSchema } from "../types";
import { eventToNoteMapper } from "../store/nostrStore";

const PAGE_SIZE = 10;
export const useGlobalFeed = () => {
  return useInfiniteQuery({
    queryKey: ["globalFeed"],
    queryFn: async ({ pageParam = Date.now() }) => {
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
};

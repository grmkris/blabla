import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { eventToNoteMapper } from "../web-sqlite/client-functions";

const PAGE_SIZE = 20;
export const useNoteComments = (props: { eventId?: string }) => {
  const comments = useInfiniteQuery({
    queryKey: ["useNoteComments", props.eventId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!props.eventId) throw new Error("No event id");
      const events = await api.getPostComments({
        event_id: props.eventId,
        pageParam,
        pageSize: 20,
      });
      return events.map((x) => eventToNoteMapper(x));
    },
    enabled: !!props.eventId,
    getNextPageParam: (lastPage) => {
      return lastPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length === PAGE_SIZE ? PAGE_SIZE : undefined;
    },
  });
  return {
    comments,
  };
};

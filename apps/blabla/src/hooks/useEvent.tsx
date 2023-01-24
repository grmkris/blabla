import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import { Warning } from "postcss";
import { useNostrRelayPool } from "./useNostrRelayPool";

const PAGE_SIZE = 20;
export const useEvent = (props: { eventId?: string }) => {
  const { getEventById } = useNostrRelayPool();
  const comments = useInfiniteQuery({
    queryKey: ["getPostComments", props.eventId],
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

  const event = useQuery({
    queryKey: ["event", props.eventId],
    queryFn: async (context) => {
      if (!props.eventId) throw new Error("No event id");
      const event = await api.getEvent(props.eventId);
      if (!event) {
        await getEventById.mutate({ id: props.eventId });
        throw new Warning(
          "Event not found, fetching... EventID: " + props.eventId
        );
      }
      return event;
    },
    enabled: !!props.eventId,
  });

  return {
    comments,
    event,
  };
};

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useCallback } from "react";
import { eventToNoteMapper } from "../web-sqlite/client-functions";

export const useEvents = (props: { eventId?: string; pubkey?: string }) => {
  const queryClient = useQueryClient();
  const bookmarkEvent = useMutation(async (eventId: string) => {
    await api.bookmarkEvent(eventId);
    await queryClient.invalidateQueries();
  });

  const unbookmarkEvent = useMutation(async (eventId: string) => {
    await api.unbookmarkEvent(eventId);
    await queryClient.invalidateQueries();
  });

  const bookmarkedEvents = useQuery({
    queryKey: ["bookmarkedEvents"],
    queryFn: async () => {
      return await api.getBookmarkedEvents();
    },
    refetchInterval: false,
  });

  const isBookmarked = useCallback(() => {
    if (!props.eventId || !bookmarkedEvents.data) return false;
    return bookmarkedEvents.data.some((x) => x.id === props.eventId);
  }, [props.eventId, bookmarkedEvents.data]);

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

  return {
    bookmarkEvent,
    unbookmarkEvent,
    bookmarkedEvents,
    isBookmarked,
    eventsByPubkey,
  };
};

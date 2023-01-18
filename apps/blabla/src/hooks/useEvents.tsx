import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useCallback } from "react";

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

  const event = useQuery({
    queryKey: ["event", props.eventId],
    queryFn: async () => {
      const event = await api.getEvent(props.eventId!);
      if (!event) throw new Error("Event not found");
      return event;
    },
    enabled: !!props.eventId,
  });

  const isBookmarked = useCallback(() => {
    if (!props.eventId || !bookmarkedEvents.data) return false;
    return bookmarkedEvents.data.some((x) => x.id === props.eventId);
  }, [props.eventId, bookmarkedEvents.data]);

  const eventsByPubkey = useQuery({
    queryKey: ["eventsByPubkey", props.pubkey],
    queryFn: async () => {
      return await api.getEvents({
        filter: "pubkey",
        filter_value: props.pubkey,
        limit: 100,
        order: "DESC",
        filter_operator: "=",
        offset: 0,
        order_by: "created_at",
      });
    },
    enabled: !!props.pubkey,
  });

  return {
    bookmarkEvent,
    unbookmarkEvent,
    bookmarkedEvents,
    event,
    isBookmarked,
    eventsByPubkey,
  };
};

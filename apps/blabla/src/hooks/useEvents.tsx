import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useCallback } from "react";

export const useEvents = (props: { eventId?: string; pubkey?: string }) => {
  const bookmarkEvent = useMutation(async (eventId: string) => {
    await api.bookmarkEvent(eventId);
  });

  const unbookmarkEvent = useMutation(async (eventId: string) => {
    await api.unbookmarkEvent(eventId);
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

  return {
    bookmarkEvent,
    unbookmarkEvent,
    bookmarkedEvents,
    isBookmarked,
  };
};

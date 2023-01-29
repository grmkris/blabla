import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";

export const useEvents = () => {
  const queryClient = useQueryClient();
  const bookmarkedEvents = useQuery({
    queryKey: ["bookmarkedEvents"],
    queryFn: async () => {
      return await api.getBookmarkedEvents();
    },
    refetchInterval: false,
  });

  const bookmarkEvent = useMutation(async (eventId: string) => {
    await api.bookmarkEvent(eventId);
    await queryClient.invalidateQueries(["bookmarkedEvents"]);
  });

  const unbookmarkEvent = useMutation(async (eventId: string) => {
    await api.unbookmarkEvent(eventId);
    await queryClient.invalidateQueries(["bookmarkedEvents"]);
  });

  return {
    bookmarkedEvents,
    bookmarkEvent,
    unbookmarkEvent,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { EventTable } from "../web-sqlite/schema";
import { EventTableSchema } from "../web-sqlite/schema";
import { insertOrUpdateBookmark } from "../web-sqlite/client-functions";
import { get } from "../web-sqlite/sqlite";

export const useEvents = (props: { eventId?: string; pubkey?: string }) => {
  const queryClient = useQueryClient();

  const bookmarkEvent = useMutation(async (eventId: string) => {
    await insertOrUpdateBookmark(eventId);
    await queryClient.invalidateQueries(["bookmarkedProfiles"]);
    await queryClient.invalidateQueries(["bookmarkedEvents"]);
  });

  const unbookmarkEvent = useMutation(async (event: EventTable) => {
    await insertOrUpdateBookmark(event.id);
    await queryClient.invalidateQueries(["bookmarkedProfiles"]);
    await queryClient.invalidateQueries(["bookmarkedEvents"]);
  });

  const bookmarkedEvents = useQuery({
    queryKey: ["bookmarkedEvents"],
    queryFn: async () => {
      const select = `select * from events where id in (select event_id from bookmarks)`;
      const res1 = (await get(select)) as any[];
      console.log("bookmarkedEvents", res1);
      const events: EventTable[] = res1[0]?.map((x) =>
        EventTableSchema.parse(x)
      );
      return events || [];
    },
    refetchInterval: false,
  });

  const event = useQuery({
    queryKey: ["bookmarkedEvent", props.eventId],
    queryFn: async () => {
      const select = `select * from events where id = "${props.eventId}"`;
      const res1 = (await get(select)) as any[];
      const events: EventTable[] = res1[0]?.map((x) =>
        EventTableSchema.parse(x)
      );
      return events[0] || null;
    },
    enabled: !!props.eventId,
  });

  const isBookmarked = useQuery({
    queryKey: ["isBookmarked", props.eventId],
    queryFn: async () => {
      const select = `select * from bookmarks where event_id = ${props.eventId}`;
      const res1 = (await get(select)) as any[];
      const bookmarks: EventTable[] = res1[0]?.map((x) =>
        EventTableSchema.parse(x)
      );
      return bookmarks.length > 0;
    },
  });

  const eventsByPubkey = useQuery({
    queryKey: ["eventsByPubkey", props.pubkey],
    queryFn: async () => {
      const select = `select * from events where pubkey = ${props.pubkey}`;
      const res1 = (await get(select)) as any[];
      const events: EventTable[] = res1[0]?.map((x) =>
        EventTableSchema.parse(x)
      );
      return events || [];
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

import { useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { Warning } from "postcss";
import { useNostrRelayPool } from "./nostr-relay-pool/useNostrRelayPool";

export const useEvent = (props: { eventId?: string }) => {
  const { getEventById } = useNostrRelayPool();

  const event = useQuery({
    queryKey: ["useEvent", props.eventId],
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
    event,
  };
};

import { useNostrEvents } from "nostr-react";
import { insertOrUpdateEvent } from "../web-sqlite/client-functions";
import { useState } from "react";

export const useEventFetcher = (props: { eventId: string }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { onEvent, unsubscribe } = useNostrEvents({
    filter: {
      ids: [props.eventId],
    },
    enabled: !shouldFetch,
  });

  onEvent(async (event) => {
    await insertOrUpdateEvent(event);
  });

  return {
    fetch: () => {
      setShouldFetch(true);
    },
  };
};

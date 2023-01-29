import { useRouter } from "next/router";
import { z } from "zod";
import { Layout } from "../../components/Layout";
import { useContext, useEffect } from "react";
import { useEvent } from "../../hooks/useEvent";
import NoSSR from "../../components/common/NoSSR";
import { EventComponent } from "../../components/event-view/EventComponent";
import { useNostrRelayPool } from "../../hooks/nostr-relay-pool/useNostrRelayPool";
import { eventToNoteMapper } from "../../web-sqlite/client-functions";
import { NostrSocketContext } from "../../NostrSocketContext";
import { useNoteComments } from "../../hooks/useNoteComments";

export const EventPage = () => {
  // get identity id from url
  const router = useRouter();
  const { event } = router.query;
  const parsed = z.string().safeParse(event);
  return (
    <Layout>
      <div className="flex flex-col">
        {parsed.success && <EventPageDetailedView event={parsed.data} />}
        {!parsed.success && <div>Invalid identity</div>}
      </div>
    </Layout>
  );
};

export default EventPage;

const EventPageDetailedView = (props: { event: string }) => {
  const { relayPool } = useContext(NostrSocketContext);
  const { getNostrData } = useNostrRelayPool();
  const { event } = useEvent({ eventId: props.event });
  const { comments } = useNoteComments({ eventId: props.event });

  useEffect(() => {
    if (relayPool) {
      getNostrData.mutate({ filter: [{ "#e": [props.event] }] });
    }
  }, [relayPool]);

  return (
    <NoSSR>
      <div className={"m-4 space-y-1"}>
        {event.data && <EventComponent note={eventToNoteMapper(event.data)} />}
        Comments:
        {comments.data?.pages.map((page, i) =>
          page.map((note) => <EventComponent note={note} key={note.event.id} />)
        )}
      </div>
    </NoSSR>
  );
};

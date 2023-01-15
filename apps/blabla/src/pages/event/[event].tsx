import { useRouter } from "next/router";
import { z } from "zod";
import { Layout } from "../../components/Layout";
import { useNostrEvents } from "nostr-react";
import { EventComponent } from "../../components/Events";
import { eventToNoteMapper } from "../../store/nostrStore";
import NoSSR from "../../components/NoSSR";

export const EventPage = () => {
  // get identity id from url
  const router = useRouter();
  const { event } = router.query;
  const parsed = z.string().safeParse(event);
  return (
    <Layout>
      <div className="flex flex-col">
        <h1>Post</h1>
        {parsed.success && <EventView event={parsed.data} />}
        {!parsed.success && <div>Invalid identity</div>}
      </div>
    </Layout>
  );
};

export default EventPage;

const EventView = (props: { event: string }) => {
  const { events } = useNostrEvents({
    filter: { ids: [props.event] },
  });
  const { events: referencedByEvents } = useNostrEvents({
    filter: { "#e": [props.event] },
  });
  return (
    <NoSSR>
      <div className={"m-4 space-y-1"}>
        {events.map(eventToNoteMapper).map((note) => (
          <EventComponent note={note} key={note.event.id} />
        ))}
        Comments:
        {referencedByEvents.map(eventToNoteMapper).map((note) => (
          <EventComponent note={note} key={note.event.id} />
        ))}
      </div>
    </NoSSR>
  );
};

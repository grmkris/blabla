import { useRouter } from "next/router";
import { z } from "zod";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import NoSSR from "../../components/NoSSR";
import { useNostrRelayPool } from "../../hooks/useNostrRelayPool";
import { useEffect } from "react";
import { useEvent } from "../../hooks/useEvent";

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
  const { getNostrData } = useNostrRelayPool();
  const { comments } = useEvent({ eventId: props.event });

  useEffect(() => {
    console.log("comments", comments);
    getNostrData.mutate({ filter: [{ "#e": [props.event] }] });
  }, []);

  return (
    <NoSSR>
      <div className={"m-4 space-y-1"}>
        {/*{referencedByEvents.map(eventToNoteMapper).map((note) => (
          <EventComponent note={note} key={note.event.id} />
        ))}*/}
        Comments:
        {comments.data?.pages.map((page, i) =>
          page.map((note) => <EventComponent note={note} key={note.event.id} />)
        )}
      </div>
    </NoSSR>
  );
};

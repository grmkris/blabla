import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { Layout } from "../components/Layout";
import { NewPost } from "../components/NewPost";
import { useRef } from "react";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";
import { insertOrUpdateEvent } from "./_app";
import { useGlobalFeed } from "../hooks/useGlobalFeed";
import { Button } from "../components/common/common";

export const GloboalFeed = () => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const events = useGlobalFeed();
  const { onEvent } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current) - 120, // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
    },
  });
  onEvent((event) => {
    console.log("New event", event);
    insertOrUpdateEvent(event);
  });

  return (
    <div className={"m-4 mb-20"}>
      <h1 className="text-2xl font-bold">Global Feed</h1>
      <NewPost />
      <div className="flex max-w-full flex-col flex-col items-start space-y-2">
        {events.data?.pages?.map((notes) =>
          notes.map((note) => (
            <EventComponent note={note} key={note.event.id} />
          ))
        )}
        <Button onClick={() => events.fetchNextPage()}>Load more</Button>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <Layout>
      <NoSSR>
        <div className="max-w-screen-sm items-center">
          <GloboalFeed />
        </div>
      </NoSSR>
    </Layout>
  );
};

export default Home;

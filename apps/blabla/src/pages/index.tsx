import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { Layout } from "../components/Layout";
import { NewPost } from "../components/NewPost";
import { useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";
import { useGlobalFeed } from "../hooks/useGlobalFeed";
import { Button } from "../components/common/common";
import { insertOrUpdateEvent } from "../web-sqlite/client-functions";
export const GloboalFeed = () => {
  const { globalFeed, numberOfNewItems, refresh, now } = useGlobalFeed();
  const { onEvent } = useNostrEvents({
    filter: {
      since: now.current - 1000, // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
    },
  });
  onEvent(async (event) => {
    insertOrUpdateEvent(event);
  });

  return (
    <div className={"m-4 mb-20"}>
      <h1 className="text-2xl font-bold">Global Feed</h1>
      <NewPost />
      <div className="flex max-w-full flex-col flex-col items-start space-y-2">
        {numberOfNewItems.data > 0 && (
          <Button onClick={refresh}>{numberOfNewItems.data} new items</Button>
        )}
        {globalFeed.data?.pages?.map((notes) =>
          notes.map((note) => (
            <EventComponent note={note} key={note.event.id} />
          ))
        )}
        <Button onClick={() => globalFeed.fetchNextPage()}>Load more</Button>
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

import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { Layout } from "../components/Layout";
import { useRef } from "react";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";
import { NewPost } from "../components/NewPost";

export const GloboalFeed = () => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const { events } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current) - 120, // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
    },
  });
  return (
    <div className={"w-screen md:max-w-prose"}>
      <div className={"m-4 mb-20"}>
        <h1 className="text-2xl font-bold">Global Feed</h1>
        <NewPost />
        <div className="flex max-w-full flex-col items-start space-y-1">
          {events.map((event) => (
            <EventComponent event={{ ...event, seen: false }} key={event.id} />
          ))}
        </div>
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

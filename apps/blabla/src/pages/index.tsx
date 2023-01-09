import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { AddRelay } from "../components/AddRelay";
import { Layout } from "../components/Layout";
import { useRef } from "react";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";

export const GloboalFeed = () => {
  const now = useRef(new Date()); // Make sure current time isn't re-rendered

  const { events } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current), // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Global Feed</h1>
      <div className="flex flex-col items-start space-y-1">
        {events.map((event) => (
          <EventComponent event={{ ...event, seen: false }} key={event.id} />
        ))}
      </div>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-white">
        Welcome to <a>Blabla</a>!
      </h1>
      <NoSSR>
        <div className="max-w-prose items-center">
          <GloboalFeed />
        </div>
      </NoSSR>
    </Layout>
  );
};

export default Home;

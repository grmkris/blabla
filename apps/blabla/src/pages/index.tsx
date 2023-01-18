import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { Layout } from "../components/Layout";
import { NewPost } from "../components/NewPost";
import { useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";
import { useBookmarksFeed, useGlobalFeed } from "../hooks/useGlobalFeed";
import { Button } from "../components/common/common";
import { insertOrUpdateEvent } from "../web-sqlite/client-functions";
import { useState } from "react";
import { useSqlite } from "../hooks/useSqlite";
export const Home = () => {
  const [selectedTab, setSelectedTab] = useState<
    "Global" | "Followed" | "Bookmarked" | "Lists"
  >("Global");

  return (
    <div className={"m-4 mb-20"}>
      <NewPost />
      <div className={"flex flex-col"}>
        <h1 className="text-4xl font-bold">Feed</h1>
        <div className="tabs tabs-boxed mb-2 w-fit">
          <a
            className={`tab ${selectedTab === "Global" && "tab-active"}`}
            onClick={() => setSelectedTab("Global")}
          >
            Global
          </a>
          <a
            className={`tab ${selectedTab === "Bookmarked" && "tab-active"}`}
            onClick={() => setSelectedTab("Bookmarked")}
          >
            Bookmarked
          </a>
          <a
            className={`tab ${selectedTab === "Followed" && "tab-active"}`}
            onClick={() => setSelectedTab("Followed")}
          >
            Followed
          </a>
          <a
            className={`tab ${selectedTab === "Lists" && "tab-active"}`}
            onClick={() => setSelectedTab("Lists")}
          >
            Lists
          </a>
        </div>
        <div>
          {selectedTab === "Global" && <GlobalFeed />}
          {selectedTab === "Bookmarked" && <BookmarkedFeed />}
        </div>
      </div>
    </div>
  );
};

const HomePage: NextPage = () => {
  return (
    <Layout>
      <NoSSR>
        <div className="max-w-screen-sm items-center">
          <Home />
        </div>
      </NoSSR>
    </Layout>
  );
};

export default HomePage;

export const GlobalFeed = () => {
  const { globalFeed, numberOfNewItems, refresh, now } = useGlobalFeed();
  const { onEvent } = useNostrEvents({
    filter: {
      since: now.current - 1000, // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
    },
  });
  onEvent(insertOrUpdateEvent);
  return (
    <div className="flex max-w-full flex-col flex-col items-start space-y-2">
      {numberOfNewItems.data > 0 && (
        <Button onClick={refresh}>{numberOfNewItems.data} new items</Button>
      )}
      {globalFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => globalFeed.fetchNextPage()}>Load more</Button>
    </div>
  );
};

export const BookmarkedFeed = () => {
  const { bookmarksFeed, numberOfNewItems, refresh, now } = useBookmarksFeed();
  const { bookmarkedProfiles } = useSqlite({});
  const { onEvent } = useNostrEvents({
    filter: {
      since: now.current - 60 * 60 * 24, // all new events from now
      kinds: [EventKinds.TEXT_NOTE],
      authors: bookmarkedProfiles.data?.map((profile) => profile.pubkey),
      "#p": bookmarkedProfiles.data?.map((profile) => profile.pubkey),
    },
  });
  onEvent(insertOrUpdateEvent);
  return (
    <div className="flex max-w-full flex-col flex-col items-start space-y-2">
      {numberOfNewItems.data > 0 && (
        <Button onClick={refresh}>{numberOfNewItems.data} new items</Button>
      )}
      {bookmarksFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => bookmarksFeed.fetchNextPage()}>Load more</Button>
    </div>
  );
};

import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { EventComponent } from "../components/Events";
import { Layout } from "../components/Layout";
import { useNostrEvents } from "nostr-react";
import { EventKinds } from "../types";
import { useBookmarksFeed, useGlobalFeed } from "../hooks/useGlobalFeed";
import { Button } from "../components/common/common";
import { insertOrUpdateEvent } from "../web-sqlite/client-functions";
import { useState } from "react";
import { useSqlite } from "../hooks/useSqlite";
import React from "react";

const tabs = [
  { name: "Global", href: "global" },
  { name: "Bookmarked", href: "followed" },
  { name: "Followed", href: "bookmarked" },
  { name: "Lists", href: "lists" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type selectedTabType = {
  selectedTab: "Global" | "Followed" | "Bookmarked" | "Lists";
};

export const Home = () => {
  const [selectedTab, setSelectedTab] = useState<
    "Global" | "Followed" | "Bookmarked" | "Lists"
  >("Global");

  const onChangeHandler = (
    selectPick: "Global" | "Followed" | "Bookmarked" | "Lists"
  ) => {
    setSelectedTab(selectPick);
  };

  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="question-tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="question-tabs"
            className="block w-full rounded-md border-slate-800 bg-slate-900 text-base font-medium text-white shadow-sm focus:border-emerald-900 focus:ring-emerald-800"
            onChange={(e) =>
              onChangeHandler(
                e.target.value as "Global" | "Followed" | "Bookmarked" | "Lists"
              )
            }
            value={selectedTab}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-slate-800 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                onClick={() =>
                  setSelectedTab(
                    tab.name as "Global" | "Followed" | "Bookmarked" | "Lists"
                  )
                }
                aria-current={selectedTab === tab.name ? "page" : undefined}
                className={classNames(
                  selectedTab === tab.name
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-400",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 cursor-pointer overflow-hidden bg-slate-900 py-4 px-6 text-center text-sm font-medium text-white hover:bg-slate-800 focus:z-10"
                )}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    selectedTab === tab.name
                      ? "bg-emerald-900"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4">
        {selectedTab === "Global" && <GlobalFeed />}
        {selectedTab === "Bookmarked" && <BookmarkedFeed />}
      </div>
    </>
  );
};

const HomePage: NextPage = () => {
  return (
    <Layout title="Feed">
      <NoSSR>
        <Home />
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
    <div className="flex max-w-full flex-col items-start space-y-2">
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

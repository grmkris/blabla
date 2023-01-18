import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { useState } from "react";
import { IdentityInformationCard } from "./identity/[identity]";
import { EventComponent } from "../components/Events";
import { useSqlite } from "../hooks/useSqlite";
import { useEvents } from "../hooks/useEvents";
import { eventToNoteMapper } from "../web-sqlite/client-functions";

export default function Saved() {
  const [selectedTab, setSelectedTab] = useState<"profiles" | "events">(
    "profiles"
  );
  const handleTabClick = () => {
    if (selectedTab === "profiles") {
      setSelectedTab("events");
    } else {
      setSelectedTab("profiles");
    }
  };
  return (
    <Layout>
      <NoSSR>
        <div className={"m-4 mb-20 flex flex-col"}>
          <h1 className="text-2xl font-bold">Saved</h1>
          <div className="tabs tabs-boxed w-fit" onClick={handleTabClick}>
            <a className={`tab ${selectedTab === "profiles" && "tab-active"}`}>
              People
            </a>
            <a className={`tab ${selectedTab === "events" && "tab-active"}`}>
              Posts
            </a>
          </div>
          <div>
            {selectedTab === "profiles" && <SavedProfiles />}
            {selectedTab === "events" && <SavedEvents />}
          </div>
        </div>
      </NoSSR>
    </Layout>
  );
}

function SavedProfiles() {
  const { bookmarkedProfiles } = useSqlite({});
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      {bookmarkedProfiles.data?.map(
        (person, index) =>
          person?.pubkey && (
            <IdentityInformationCard identity={person?.pubkey} key={index} />
          )
      )}
    </div>
  );
}

function SavedEvents() {
  const { bookmarkedEvents } = useEvents({});
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      {bookmarkedEvents.data
        ?.map((event) =>
          eventToNoteMapper({
            pubkey: event?.pubkey,
            kind: event?.kind,
            created_at: event?.created_at,
            content: event?.content,
            sig: event?.sig,
            id: event?.id,
            tags: JSON.parse(event?.tags_full),
          })
        )
        ?.map(
          (note, index) =>
            note?.event && <EventComponent note={note} key={note.event.id} />
        )}
    </div>
  );
}

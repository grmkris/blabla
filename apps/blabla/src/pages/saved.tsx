import { Layout } from "../components/Layout";
import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import NoSSR from "../components/common/NoSSR";
import { EventComponent } from "../components/event-view/EventComponent";
import { IdentityPreview } from "../components/pubkey/IdentityPreview";
import { useProfiles } from "../hooks/useProfiles";

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
    <Layout title={"Saved"}>
      <NoSSR>
        <div className={"m-4 mb-20 flex flex-col"}>
          <div className="tabs tabs-boxed mb-2 w-fit" onClick={handleTabClick}>
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
  const { bookmarkedProfiles } = useProfiles();
  return (
    <div className="flex flex-col space-y-4">
      {bookmarkedProfiles.data?.map(
        (person, index) =>
          person?.pubkey && (
            <IdentityPreview identity={person?.pubkey} key={index} />
          )
      )}
    </div>
  );
}

function SavedEvents() {
  const { bookmarkedEvents } = useEvents();
  return (
    <div className="flex flex-col space-y-4">
      {bookmarkedEvents.data
        ?.map((event) =>
          eventToNoteMapper({
            pubkey: event?.pubkey,
            kind: event?.kind,
            created_at: event?.created_at,
            content: event?.content,
            sig: event?.sig,
            id: event?.id,
            tags: event?.tags,
          })
        )
        ?.map(
          (note, index) =>
            note?.event && <EventComponent note={note} key={note.event.id} />
        )}
    </div>
  );
}

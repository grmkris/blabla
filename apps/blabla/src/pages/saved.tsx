import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { useState } from "react";
import { useAppStore } from "../store/appStore";
import { IdentityInformationCard } from "./identity/[identity]";
import { eventToNoteMapper } from "../store/nostrStore";
import { EventComponent } from "../components/Events";

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
  const following = useAppStore.use.saved().profiles;
  console.log("following", following);
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      {following.map(
        (person, index) =>
          person?.pubkey && (
            <IdentityInformationCard identity={person?.pubkey} key={index} />
          )
      )}
    </div>
  );
}

function SavedEvents() {
  const notes = useAppStore.use.saved().notes;
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      {notes.map(
        (note, index) =>
          note?.event && <EventComponent note={note} key={note.event.id} />
      )}
    </div>
  );
}

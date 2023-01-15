import SavedProfiles, { SavedEvents } from "../components/SavedProfiles";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { useState } from "react";

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
        <div className={"flex flex-wrap"}>
          <div className="tabs tabs-boxed" onClick={handleTabClick}>
            <a className={`tab ${selectedTab === "profiles" && "tab-active"}`}>
              Posts
            </a>
            <a className={`tab ${selectedTab === "events" && "tab-active"}`}>
              People
            </a>
          </div>
          {selectedTab === "profiles" && <SavedProfiles />}
          {selectedTab === "events" && <SavedEvents />}
        </div>
      </NoSSR>
    </Layout>
  );
}

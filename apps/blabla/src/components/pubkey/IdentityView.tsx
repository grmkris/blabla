import { z } from "zod";
import { useSearchParams } from "@jokullsolberg/next-use-search-params";
import { Button } from "../common/Button";
import { useEventsByPubkey } from "../../hooks/useEventsByPubkey";
import { EventComponent } from "../event-view/EventComponent";
import { FollowersList, FollowsList, SecondFollowsList } from "./Followers";
import { IdentityInformationCard } from "./IdentityInformationCard";

export const IdentityViewSchema = z.enum([
  "events",
  "followers",
  "following",
  "explore",
]);
export const IdentityView = (props: { identity: string }) => {
  const [{ selected }, setSearchParam] = useSearchParams({
    id: z.string(),
    selected: IdentityViewSchema.default("events"),
  });

  const handleFollowerClick = () => {
    setSearchParam("selected", "followers");
  };
  const handleFollowingClick = () => {
    setSearchParam("selected", "following");
  };
  const handleEventsClick = () => {
    setSearchParam("selected", "events");
  };
  const handleExploreClick = () => {
    setSearchParam("selected", "explore");
  };

  return (
    <div className={"m-4 mb-20"}>
      <IdentityInformationCard
        identity={props.identity}
        onFollowersClick={handleFollowerClick}
        onFollowingClick={handleFollowingClick}
      />

      <div className="btn-group m-2 flex justify-center">
        <ul className="menu rounded-box menu-horizontal bg-base-100 p-2">
          <li onClick={handleEventsClick}>
            <a className={selected === "events" ? "active" : ""}>Events</a>
          </li>
          <li onClick={handleFollowerClick}>
            <a className={selected === "followers" ? "active" : ""}>
              Followers
            </a>
          </li>
          <li onClick={handleFollowingClick}>
            <a className={selected === "following" ? "active" : ""}>
              Following
            </a>
          </li>
          <li onClick={handleExploreClick}>
            <a className={selected === "explore" ? "active" : ""}>Explore</a>
          </li>
        </ul>
      </div>
      {selected === "events" && <IdentityEvents identity={props.identity} />}
      {selected === "followers" && <FollowersList identity={props.identity} />}
      {selected === "following" && <FollowsList identity={props.identity} />}
      {selected === "explore" && <SecondFollowsList identity={props.identity} />}
    </div>
  );
};

export const IdentityEvents = (props: { identity: string }) => {
  const { eventsByPubkey } = useEventsByPubkey({ pubkey: props.identity });

  if (eventsByPubkey.isLoading) {
    return <div>Loading from cache...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <h1>Events</h1>
      {eventsByPubkey?.data?.pages.map((page) =>
        page.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => eventsByPubkey.fetchNextPage()}>Load more</Button>
    </div>
  );
};

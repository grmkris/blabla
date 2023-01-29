import { z } from "zod";
import { useSearchParams } from "@jokullsolberg/next-use-search-params";
import { Button } from "./common/Button";
import {
  usePubkey,
  usePubkeyFollowers,
  usePubkeyFollowing,
} from "../hooks/usePubkey";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import { hashTagAttacher } from "./event-view/event.utills";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useEventsByPubkey } from "../hooks/useEventsByPubkey";
import { useNostrRelayPool } from "../hooks/nostr-relay-pool/useNostrRelayPool";
import { useCallback, useEffect } from "react";
import { EventComponent } from "./event-view/EventComponent";
import { IdentityPreview } from "./IdentityPreview";
import { LoadingSpinner } from "./common/LoadingSpinner";

export const IdentityViewSchema = z.enum(["events", "followers", "following"]);
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

  return (
    <div className={"m-4 mb-20"}>
      <IdentityInformationCard
        identity={props.identity}
        onFollowersClick={handleFollowerClick}
        onFollowingClick={handleFollowingClick}
      />

      <div className="btn-group">
        <Button
          className={selected === "events" ? "btn-active" : ""}
          onClick={handleEventsClick}
        >
          Events
        </Button>
        <Button
          className={selected === "followers" ? "btn-active" : ""}
          onClick={handleFollowerClick}
        >
          Followers
        </Button>
        <Button
          className={selected === "following" ? "btn-active" : ""}
          onClick={handleFollowingClick}
        >
          Following
        </Button>
      </div>
      {selected === "events" && <IdentityEvents identity={props.identity} />}
      {selected === "followers" && <FollowersList identity={props.identity} />}
      {selected === "following" && <FollowsList identity={props.identity} />}
    </div>
  );
};

export const IdentityInformationCard = (props: {
  identity: string;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}) => {
  const { profile, bookmarkProfile, unbookmarkProfile } = usePubkey({
    pubkey: props.identity,
  });
  const { count: followersCount } = usePubkeyFollowers({
    pubkey: props.identity,
  });
  const { count: followingCount } = usePubkeyFollowing({
    pubkey: props.identity,
  });

  const handleBookmarkProfileClicked = () => {
    const bookmarked = profile.data?.is_bookmarked;
    bookmarked
      ? unbookmarkProfile.mutate(props.identity)
      : bookmarkProfile.mutate(props.identity);
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-24 rounded-xl">
              <img
                src={
                  profile?.data?.picture
                    ? profile?.data?.picture
                    : "/images/placeholder.png"
                }
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{profile?.data?.display_name}</h2>
          <h3 className="card-title">{profile?.data?.name}</h3>
          <div className={"items-left max-w-prose text-left"}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkImages, hashTagAttacher]}
              components={{
                a: ({ node, ...props }) => {
                  return (
                    <a
                      className={"text-blue-500 hover:text-blue-700"}
                      {...props}
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  );
                },
              }}
            >
              {profile?.data?.about ?? ""}
            </ReactMarkdown>
          </div>
          <div className={"flex flex-col md:flex-row"}>
            <div className="badge-outline badge w-56 truncate">
              {profile?.data?.npub}
            </div>
            <div className="badge-outline badge">{profile?.data?.website}</div>
            <div className="badge-outline badge">{profile?.data?.lud16}</div>
          </div>
          <div className={"m-2 flex flex-col md:flex-row"}>
            <div
              className="badge-outline badge cursor-pointer hover:bg-base-300"
              onClick={props.onFollowersClick}
            >
              {followersCount.data ?? <LoadingSpinner />} followers
            </div>
            <div
              className="badge-outline badge cursor-pointer hover:bg-base-300"
              onClick={props.onFollowingClick}
            >
              {followingCount.data ?? <LoadingSpinner />} following
            </div>
          </div>
          <div className="card-actions">
            <div className="btn-group">
              <Button className="btn-sm btn">Follow</Button>
              <Button
                className="btn-sm btn"
                onClick={handleBookmarkProfileClicked}
              >
                {profile.data?.is_bookmarked ? (
                  <BookmarkSlashIcon className="h-5 w-5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const IdentityEvents = (props: { identity: string }) => {
  const { eventsByPubkey } = useEventsByPubkey({ pubkey: props.identity });
  const { retrievePubkeyInfos } = useNostrRelayPool();

  const useEffectCallback = useCallback(() => {
    retrievePubkeyInfos.mutate({ author: props.identity });
  }, []);

  useEffect(useEffectCallback, [props.identity]);

  if (eventsByPubkey.isLoading) {
    return <div>Loading from cache...</div>;
  }

  if (retrievePubkeyInfos.isLoading) {
    return <div>Loading from network...</div>;
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

export const FollowsList = (props: { identity: string }) => {
  const { following } = usePubkeyFollowing({ pubkey: props.identity });
  return (
    <div className="flex flex-col space-y-4">
      <h1>Follows</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {following?.data?.pages.map((pages) =>
          pages.map((identity) => {
            return (
              <li key={identity} className="px-4 py-4 sm:px-0">
                {identity && <IdentityPreview identity={identity} />}
              </li>
            );
          })
        )}
      </ul>
      <Button onClick={() => following.fetchNextPage()}>Load more</Button>
    </div>
  );
};

export const FollowersList = (props: { identity: string }) => {
  const { followers } = usePubkeyFollowers({ pubkey: props.identity });
  return (
    <div className="flex flex-col space-y-4">
      <h1>Followers</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {followers?.data?.pages.map((pages) =>
          pages.map((identity) => {
            return (
              <li key={identity} className="px-4 py-4 sm:px-0">
                {identity && <IdentityPreview identity={identity} />}
              </li>
            );
          })
        )}
      </ul>
      <Button onClick={() => followers.fetchNextPage()}>Load more</Button>
    </div>
  );
};

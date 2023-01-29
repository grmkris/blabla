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
import { EventComponent } from "./event-view/EventComponent";
import { IdentityPreview } from "./IdentityPreview";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { useNostrRelayPool } from "../hooks/nostr-relay-pool/useNostrRelayPool";
import { Author, collect } from "nostr-relaypool";
import type { Event } from "nostr-tools";
import { useCallback, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import identity from "../pages/identity";

interface IdentityViewInterfaceStore {
  identities: {
    identity: string;
    followers: string[];
    following: string[];
    secondFollows?: string[];
  }[];
  updateIdentity: (props: {
    identity: string;
    followers?: string[];
    following?: string[];
    secondFollows?: string[];
  }) => void;
}

const useIdentityViewStore = create<IdentityViewInterfaceStore>()(
  immer((set, get) => ({
    identities: [],
    updateIdentity: (props) => {
      const { identity, followers, following, secondFollows } = props;
      const identities = get().identities;
      const index = identities.findIndex((i) => i.identity === identity);
      if (index === -1) {
        identities.push({
          identity,
          followers: followers ?? [],
          following: following ?? [],
        });
      } else {
        if (followers) {
          identities[index].followers = followers;
        }
        if (following) {
          identities[index].following = following;
        }
        if (secondFollows) {
          identities[index].secondFollows = secondFollows;
        }
      }
      set({ identities });
    },
  }))
);

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
        <Button
          className={selected === "explore" ? "btn-active" : ""}
          onClick={handleExploreClick}
        >
          Explore
        </Button>
      </div>
      {selected === "events" && <IdentityEvents identity={props.identity} />}
      {selected === "followers" && <FollowersList identity={props.identity} />}
      {selected === "following" && <FollowsList identity={props.identity} />}
      {selected === "explore" && <RecommendedList identity={props.identity} />}
    </div>
  );
};

export const IdentityInformationCard = (props: {
  identity: string;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}) => {
  const { retrievePubkeyTexts, retrievePubkeyInfos, retrievePubkeyMetadata } =
    useNostrRelayPool();
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

  const handleRefresh = async () => {
    retrievePubkeyTexts.mutate({
      author: props.identity,
    });
    retrievePubkeyMetadata.mutate({ author: props.identity });
    retrievePubkeyInfos.mutate({
      author: props.identity,
    });
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
              <Button className="btn-sm btn">Message</Button>
              <Button className="btn-sm btn">Open on</Button>
              <Button className="btn-sm btn" onClick={handleRefresh}>
                Refresh
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

export const FollowsList = (props: { identity: string }) => {
  const { nostrRelays, relayPool } = useNostrRelayPool();
  const following = useRef(
    useIdentityViewStore
      .getState()
      .identities?.find((i) => i.identity === props.identity)?.following
  );
  const updateIdentity = useIdentityViewStore((state) => state.updateIdentity);

  useEffect(
    () =>
      useIdentityViewStore.subscribe(
        (scratches) =>
          (following.current = scratches.identities?.find(
            (i) => i.identity === props.identity
          )?.following)
      ),
    []
  );

  const handleCollectedFollowing = (pubkeys: string[]) => {
    console.log("handleCollectedFollowing: ", pubkeys);
    // remove duplicates
    const uniquePubkeys = [...new Set(pubkeys)];
    updateIdentity({
      identity: props.identity,
      following: uniquePubkeys,
    });
  };

  const getFollows = useCallback(() => {
    if (!props.identity || !nostrRelays || !relayPool) {
      return;
    }
    const author = new Author(relayPool, nostrRelays, props.identity);
    console.log("useEffect - followers: ", author.pubkey);
    author.followsPubkeys(handleCollectedFollowing, 100);
  }, [nostrRelays, props.identity, relayPool]);

  useEffect(() => {
    if (!props.identity || !nostrRelays || !relayPool) {
      return;
    }
    getFollows();
  }, [nostrRelays, props.identity, relayPool]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Follows</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {following.current?.map((identity) => {
          return (
            <li key={identity} className="px-4 py-4 sm:px-0">
              {identity && <IdentityPreview identity={identity} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const FollowersList = (props: { identity: string }) => {
  const { nostrRelays, relayPool } = useNostrRelayPool();
  const followers = useRef(
    useIdentityViewStore
      .getState()
      .identities?.find((i) => i.identity === props.identity)
  );

  useEffect(
    () =>
      useIdentityViewStore.subscribe(
        (state) =>
          (followers.current = state.identities?.find(
            (i) => i.identity === props.identity
          ))
      ),
    []
  );
  const updateIdentity = useIdentityViewStore((state) => state.updateIdentity);

  const handleCollectedFollowers = (events: Event[]) => {
    console.log("handleCollectedFollowers: " + props.identity, events);
    const pubkeys = events.map((event) => event.pubkey);
    // remove duplicates
    const identity = props.identity;
    const uniquePubkeys = [...new Set(pubkeys)];
    updateIdentity({
      identity,
      followers: uniquePubkeys,
    });
  };
  useEffect(() => {
    if (!props.identity || !nostrRelays || !relayPool) {
      return;
    }
    const author = new Author(relayPool, nostrRelays, props.identity);
    console.log("useEffect - followers: ", author.pubkey);
    author.followers(collect(handleCollectedFollowers), 100, 9999999999);
  }, [nostrRelays, props.identity, relayPool]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Followers</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {followers.current?.followers.map((follower) => {
          return (
            <li key={follower} className="px-4 py-4 sm:px-0">
              {follower && <IdentityPreview identity={follower} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const RecommendedList = (props: { identity: string }) => {
  const { nostrRelays, relayPool } = useNostrRelayPool();
  const secondsFollows = useRef(
    useIdentityViewStore
      .getState()
      .identities.find((i) => i.identity === props.identity)
  );
  const updateIdentity = useIdentityViewStore((state) => state.updateIdentity);

  useEffect(
    () =>
      useIdentityViewStore.subscribe(
        (state) =>
          (secondsFollows.current = state.identities.find(
            (i) => i.identity === props.identity
          ))
      ),
    []
  );

  useEffect(() => {
    console.log("useEffect - RecommendedList: " + props.identity);
    if (!props.identity || !nostrRelays || !relayPool) {
      return;
    }
    const author = new Author(relayPool, nostrRelays, props.identity);
    console.log("useEffect - RecommendedList: author: ", author.pubkey);
    author.secondFollows(
      (followers) => {
        console.log("second follows: " + props.identity, followers);
        followers.sort((a, b) => b[1] - a[1]);
        const topFollows = followers.slice(0, 10).map((f) => f[0]);
        updateIdentity({
          identity: props.identity,
          secondFollows: topFollows,
        });
      },
      100,
      true
    );
  }, [nostrRelays, props.identity, relayPool]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Recommended</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {secondsFollows.current?.secondFollows?.map((identity) => {
          return (
            <li key={identity} className="px-4 py-4 sm:px-0">
              {identity && <IdentityPreview identity={identity} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

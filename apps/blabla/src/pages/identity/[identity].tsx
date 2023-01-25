import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { z } from "zod";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useSqlite } from "../../hooks/useSqlite";
import { useEvents } from "../../hooks/useEvents";
import NoSSR from "../../components/common/NoSSR";
import { Button } from "../../components/common/Button";
import { EventComponent } from "../../components/event-view/EventComponent";
import { useNostrRelayPool } from "../../hooks/nostr-relay-pool/useNostrRelayPool";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePubkey } from "../../hooks/usePubkey";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import {
  CustomTwitterPreview,
  hashTagAttacher,
} from "../../components/event-view/event.utills";
import ReactMarkdown from "react-markdown";
import { IdentityPreview } from "../../components/IdentityPreview";

export const IdentityPage = () => {
  // get identity id from url
  const router = useRouter();
  const { identity } = router.query;
  const parsed = z.string().safeParse(identity);
  return (
    <Layout title={""}>
      <div className="flex flex-col space-y-4">
        {parsed.success && <IdentityView identity={parsed.data} />}
        {!parsed.success && <div>Invalid identity</div>}
      </div>
    </Layout>
  );
};

export default IdentityPage;

export const IdentityView = (props: { identity: string }) => {
  const [selected, setSelected] = useState<
    "events" | "followers" | "following"
  >("events");

  const handleFollowerClick = () => {
    setSelected("followers");
  };
  const handleFollowingClick = () => {
    setSelected("following");
  };
  const handleEventsClick = () => {
    setSelected("events");
  };

  return (
    <NoSSR>
      <div className={"m-4 mb-20"}>
        <IdentityInformationCard
          identity={props.identity}
          onFollowersClick={handleFollowerClick}
          onFollowingClick={handleFollowingClick}
        />

        <div className="flex flex-row">
          <Button onClick={handleEventsClick}>Events</Button>
          <Button onClick={handleFollowerClick}>Followers</Button>
          <Button onClick={handleFollowingClick}>Following</Button>
        </div>
        {selected === "events" && <IdentityEvents identity={props.identity} />}
        {selected === "followers" && (
          <FollowersList identity={props.identity} />
        )}
        {selected === "following" && <FollowsList identity={props.identity} />}
      </div>
    </NoSSR>
  );
};

export const IdentityInformationCard = (props: {
  identity: string;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}) => {
  const { profile, isBookmarked, bookmarkProfile, unbookmarkProfile } =
    useSqlite({
      pubkey: props.identity,
    });
  const { getFollowingCount, getFollowersCount } = usePubkey({
    pubkey: props.identity,
  });
  const handleBookmarkProfileClicked = () => {
    const bookmarked = isBookmarked();
    if (bookmarked) {
      console.log("unbookmark", isBookmarked());
      unbookmarkProfile.mutate(props.identity);
    } else {
      console.log("bookmark");
      bookmarkProfile.mutate(props.identity);
    }
  };

  return (
    <NoSSR>
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
            <div className={"items-left text-left"}>
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
              <div className="badge-outline badge">
                {profile?.data?.website}
              </div>
              <div className="badge-outline badge">{profile?.data?.lud16}</div>
            </div>
            <div className={"m-2 flex flex-col md:flex-row"}>
              <div
                className="badge-outline badge cursor-pointer hover:bg-base-300"
                onClick={props.onFollowersClick}
              >
                {getFollowersCount.data} followers
              </div>
              <div
                className="badge-outline badge cursor-pointer hover:bg-base-300"
                onClick={props.onFollowingClick}
              >
                {getFollowingCount.data} following
              </div>
            </div>
            <div className="card-actions">
              <div className="btn-group">
                <Button className="btn-sm btn">Follow</Button>
                <Button
                  className="btn-sm btn"
                  onClick={handleBookmarkProfileClicked}
                >
                  {isBookmarked() ? (
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
    </NoSSR>
  );
};

export const IdentityEvents = (props: { identity: string }) => {
  const { eventsByPubkey } = usePubkey({ pubkey: props.identity });
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

export const FollowersList = (props: { identity: string }) => {
  const { getFollowers } = usePubkey({ pubkey: props.identity });
  return (
    <div className="flex flex-col space-y-4">
      <h1>Followers</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {getFollowers.data?.map((identity) => (
          <li key={identity.id} className="px-4 py-4 sm:px-0">
            <IdentityPreview identity={identity.pubkey!} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const FollowsList = (props: { identity: string }) => {
  const { getFollowing } = usePubkey({ pubkey: props.identity });
  return (
    <div className="flex flex-col space-y-4">
      <h1>Follows</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {getFollowing.data?.map((identity) => (
          <li key={identity.id} className="px-4 py-4 sm:px-0">
            <IdentityPreview identity={identity.follower!} />
          </li>
        ))}
      </ul>
    </div>
  );
};

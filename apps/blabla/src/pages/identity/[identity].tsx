import { useRouter } from "next/router";
import { useNostrEvents, useProfile } from "nostr-react";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import { Button } from "../../components/common/common";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";
import { z } from "zod";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useSqlite } from "../../hooks/useSqlite";
import {
  eventToNoteMapper,
  insertOrUpdateEvent,
} from "../../web-sqlite/client-functions";
import { useQueryClient } from "@tanstack/react-query";
import { useEvents } from "../../hooks/useEvents";
import type { NostrProfile } from "../../web-sqlite/schema";
import { api } from "../../web-sqlite/sqlite";
import { useEffect, useRef } from "react";
import { EventKinds } from "../../types";

export const IdentityPage = () => {
  // get identity id from url
  const router = useRouter();
  const { identity } = router.query;
  const parsed = z.string().safeParse(identity);
  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <h1>Events</h1>
        {parsed.success && <IdentityView identity={parsed.data} />}
        {!parsed.success && <div>Invalid identity</div>}
      </div>
    </Layout>
  );
};

export default IdentityPage;

export const IdentityView = (props: { identity: string }) => {
  return (
    <NoSSR>
      <div className={"m-4 mb-20"}>
        <IdentityInformationCard identity={props.identity} />
        <IdentityEvents identity={props.identity} />
      </div>
    </NoSSR>
  );
};

export const IdentityInformationCard = (props: { identity: string }) => {
  const { profile, isBookmarked, bookmarkProfile, unbookmarkProfile } =
    useSqlite({
      pubkey: props.identity,
    });
  const { data: profileData } = useProfile({
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

  const handleNewNostrProfile = async (profile: NostrProfile) => {
    console.log("handleNewNostrProfile", profile);
    await api.createOrUpdateNostrProfile(profile);
  };

  useEffect(() => {
    if (!profile.data) {
      handleNewNostrProfile({
        pubkey: props.identity,
        name: profileData?.name,
        picture: profileData?.picture,
        display_name: profileData?.display_name,
        about: profileData?.about,
        npub: profileData?.npub,
        lud06: profileData?.lud06,
        lud16: profileData?.lud16,
        nip06: profileData?.nip06,
        website: profileData?.website,
      });
    }
  });

  return (
    <NoSSR>
      <Link href={"/identity/" + props.identity} shallow>
        <div className="card bg-base-100 shadow-xl hover:bg-base-200">
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
            <p>{profile?.data?.about}</p>
            <div className={"flex flex-col md:flex-row"}>
              <div className="badge-outline badge w-56 truncate">
                {profile?.data?.npub}
              </div>
              <div className="badge-outline badge">
                {profile?.data?.website}
              </div>
              <div className="badge-outline badge">{profile?.data?.lud16}</div>
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
      </Link>
    </NoSSR>
  );
};

export const IdentityEvents = (props: { identity: string }) => {
  const { eventsByPubkey } = useEvents({ pubkey: props.identity });
  if (eventsByPubkey.isLoading) {
    return <div>Loading...</div>;
  }

  console.log("eventsByPubkey", eventsByPubkey.data);
  return (
    <div className="flex flex-col space-y-4">
      <h1>Events</h1>
      {eventsByPubkey.data.pages.map((page) =>
        page.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => eventsByPubkey.fetchNextPage()}>Load more</Button>
    </div>
  );
};

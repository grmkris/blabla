import { useNostrEvents, useProfile } from "nostr-react";
import Link from "next/link";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import type { Note } from "../types";
import { useSqlite } from "../hooks/useSqlite";
import { useEvents } from "../hooks/useEvents";
import {
  eventToNoteMapper,
  insertOrUpdateEvent,
} from "../web-sqlite/client-functions";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useEffect } from "react";
import type { NostrProfile } from "../web-sqlite/schema";

export const EventComponent = (props: { note: Note }) => {
  const { data: profileData } = useProfile({ pubkey: props.note.event.pubkey });
  const { bookmarkEvent, isBookmarked, unbookmarkEvent } = useEvents({
    eventId: props.note.event.id,
  });
  const {
    profile,
    isBookmarked: isBookmarkedProfile,
    followProfile,
    bookmarkProfile,
    unbookmarkProfile,
    bookmarkedProfiles,
  } = useSqlite({
    pubkey: props.note.event.pubkey,
  });
  const handleBookmarkEventClicked = () => {
    if (isBookmarked()) {
      console.log("unbookmark", isBookmarked());
      unbookmarkEvent.mutate(props.note.event.id);
    } else {
      console.log("bookmark");
      bookmarkEvent.mutate(props.note.event.id);
    }
  };

  const handleNewNostrProfile = async (profile: NostrProfile) => {
    console.log("handleNewNostrProfile", profile);
    await api.createOrUpdateNostrProfile({
      pubkey: props.note.event.pubkey,
      name: profile?.name,
      picture: profile?.picture,
      display_name: profile?.display_name,
      about: profile?.about,
      npub: profile?.npub,
      lud06: profile?.lud06,
      lud16: profile?.lud16,
      nip06: profile?.nip06,
      website: profile?.website,
    });
  };

  useEffect(() => {
    if (!profile.data) {
      handleNewNostrProfile(profileData);
    }
  });

  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.note.event.pubkey}`} shallow>
          <div className="card-title hover:bg-base-200">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={profile?.data?.picture ?? "/images/placeholder.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium text-gray-500">
              {profile?.data?.display_name}
              {profile?.data?.name}
              {profile?.data?.npub}
              {props.note.event.pubkey}
            </div>
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <div>
            <Link href={`/event/${props.note.event.id}`} shallow>
              <p className="cursc mt-0.5 text-sm text-gray-600 hover:bg-base-200">
                Commented{" "}
                {new Date(props.note.event.created_at * 1000).toLocaleString()}
              </p>
            </Link>
          </div>
          <div className="mt-2 overflow-hidden text-ellipsis text-sm text-gray-400">
            <p className={"prose"}>{props.note.event.content}</p>
          </div>
          <div className="card-actions mt-2 text-sm text-gray-400">
            <div className="avatar-group -space-x-6">
              {props.note.referencedProfiles.map((tag, index) => {
                return (
                  <EventReferencedAvatarComponent pubkey={tag} key={index} />
                );
              })}
            </div>
            <div className="btn-group">
              <button
                className="btn-sm btn"
                onClick={handleBookmarkEventClicked}
              >
                {isBookmarked() ? (
                  <BookmarkSlashIcon className="h-5 w-5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </button>
              <button className="btn-sm btn">
                <HeartIcon className={"h-5 w-5"} />
              </button>
              <button className="btn-sm btn">
                <ChatBubbleLeftIcon className={"h-5 w-5"} />
              </button>
            </div>
            <div className={"flex flex-col"}>
              {props.note.referencedNotes.map((tag, index) => {
                return (
                  <EventReferencedEventComponent eventId={tag} key={index} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventReferencedAvatarComponent = (props: { pubkey: string }) => {
  const { data: profileData } = useProfile({ pubkey: props.pubkey });

  if (!profileData) {
    return null;
  }
  return (
    <Link href={"/identity/" + props.pubkey} shallow>
      <div className="avatar">
        <div className="w-8">
          <img
            src={
              profileData?.picture
                ? profileData?.picture
                : "/images/placeholder.png"
            }
          />
        </div>
      </div>
    </Link>
  );
};

const EventReferencedEventComponent = (props: { eventId: string }) => {
  const queryClient = useQueryClient();
  const { event } = useEvents({ eventId: props.eventId });
  const { onEvent } = useNostrEvents({
    filter: {
      ids: [props.eventId],
    },
    enabled: !props.eventId,
  });

  onEvent(async (event) => {
    await insertOrUpdateEvent(event);
    await queryClient.invalidateQueries();
  });

  if (!event.data) {
    return null;
  }
  return (
    <EventComponent
      note={eventToNoteMapper({
        pubkey: event.data.pubkey,
        sig: event.data.sig,
        id: event.data.id,
        tags: JSON.parse(event.data.tags_full),
        created_at: event.data.created_at,
        content: event.data.content,
        kind: event.data.kind,
      })}
      key={props.eventId}
    />
  );
};

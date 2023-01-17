import { useNostrEvents, useProfile } from "nostr-react";
import Link from "next/link";
import type { Note } from "../store/nostrStore";
import { useNostrStore } from "../store/nostrStore";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import type { BlaBlaEvent } from "../store/appStore";
import { useAppStore } from "../store/appStore";

export const EventComponent = (props: { note: Note }) => {
  const { data: profileData } = useProfile({ pubkey: props.note.event.pubkey });
  const addOrUpdateNote = useAppStore.use.addOrUpdateNote();
  const removeNote = useAppStore.use.removeNote();
  const bookmarkedNote = useAppStore.use
    .saved()
    .notes?.find((x) => x.event.id === props.note.event.id);
  const localProfileData = useNostrStore.use
    .data()
    .profiles?.find((e) => e.pubkey === props.note.event.pubkey);
  const profile = profileData || localProfileData;

  const handleBookmarkClicked = () => {
    if (!!bookmarkedNote) {
      removeNote(bookmarkedNote);
    } else {
      addOrUpdateNote(props.note);
    }
  };

  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.note.event.pubkey}`} shallow>
          <div className="card-title hover:bg-base-200">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={profile?.picture ?? "/images/placeholder.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium text-gray-500">
              {profile?.display_name}
              {profile?.name}
              {profile?.npub}
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
            <p>{props.note.event.content}</p>
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
              <button className="btn-sm btn" onClick={handleBookmarkClicked}>
                {bookmarkedNote ? (
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
  const localEvent = useNostrStore.use
    .data()
    .notes.find((x) => x.event.id === props.eventId);
  const { events, onEvent } = useNostrEvents({
    filter: {
      ids: [props.eventId],
    },
    enabled: !localEvent,
  });
  const newEvent = useNostrStore.use.newEvent();

  onEvent((event) => {
    if (!!newEvent) {
      newEvent(event);
    }
  });

  if (!events[0]) {
    return null;
  }
  return <EventComponent note={localEvent} key={props.eventId} />;
};

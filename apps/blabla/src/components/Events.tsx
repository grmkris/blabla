import { useNostrEvents, useProfile } from "nostr-react";
import Link from "next/link";
import type { Note } from "../store/nostrStore";
import { useNostrStore } from "../store/nostrStore";

export const EventComponent = (props: { note: Note }) => {
  const { data: profileData } = useProfile({ pubkey: props.note.event.pubkey });
  const localProfileData = useNostrStore.use
    .data()
    .profiles.find((e) => e.pubkey === props.note.event.pubkey);
  const profile = profileData || localProfileData;

  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.note.event.pubkey}`}>
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
            <Link href={`/event/${props.note.event.id}`}>
              <p className="cursc mt-0.5 text-sm text-gray-600 hover:bg-base-200">
                Commented{" "}
                {new Date(props.note.event.created_at * 1000).toLocaleString()}
              </p>
            </Link>
          </div>
          <div className="mt-2 overflow-hidden text-ellipsis text-sm text-gray-400">
            <p>{props.note.event.content}</p>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <div className="avatar-group -space-x-6">
              {props.note.referencedProfiles.map((tag) => {
                return (
                  <EventReferencedAvatarComponent pubkey={tag} key={tag} />
                );
              })}
            </div>
            <div className={"flex flex-col flex-col-reverse"}>
              {props.note.referencedNotes.map((tag) => {
                return (
                  <EventReferencedEventComponent eventId={tag} key={tag} />
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
  console.log("EventReferencedAvatarComponent", props.pubkey);
  const { data: profileData } = useProfile({ pubkey: props.pubkey });

  if (!profileData) {
    return null;
  }
  return (
    <Link href={"/identity/" + props.pubkey}>
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

import type { BlaBlaEvent } from "../store";
import { useNostrEvents, useProfile } from "nostr-react";
import Link from "next/link";

export const EventComponent = (props: { event: BlaBlaEvent }) => {
  const { data: profileData } = useProfile({ pubkey: props.event.pubkey });
  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.event.pubkey}`}>
          <div className="card-title hover:bg-base-200">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={
                    profileData?.picture
                      ? profileData?.picture
                      : "/images/placeholder.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium text-gray-500">
              {profileData?.name} {profileData?.npub} {props.event.pubkey}
            </div>
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <div>
            <p className="mt-0.5 text-sm text-gray-600">
              Commented{" "}
              {new Date(props.event.created_at * 1000).toLocaleString()}
            </p>
          </div>
          <div className="mt-2 overflow-hidden text-ellipsis text-sm text-gray-400">
            <p>{props.event.content}</p>
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <div className="avatar-group -space-x-6">
              {props.event.tags.map((tag) => {
                console.log("tags", props.event.tags);
                if (tag[0] === "p" && tag[1]) {
                  return (
                    <EventReferencedAvatarComponent
                      pubkey={tag[1]}
                      key={tag[1]}
                    />
                  );
                }
              })}
            </div>
            {
              <div className={"flex flex-col"}>
                {props.event.tags.map((tag) => {
                  if (tag[0] === "e" && tag[1]) {
                    return (
                      <EventReferencedEventComponent
                        eventId={tag[1]}
                        key={tag[1]}
                      />
                    );
                  }
                })}
              </div>
            }
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
  );
};

const EventReferencedEventComponent = (props: { eventId: string }) => {
  const { events } = useNostrEvents({
    filter: {
      ids: [props.eventId],
    },
  });

  if (!events[0]) {
    return null;
  }
  return (
    <EventComponent event={{ ...events[0], seen: false }} key={props.eventId} />
  );
};

import type { BlaBlaEvent } from "../store";
import { useNostrStore } from "../store";
import { useNostrEvents, useProfile } from "nostr-react";
import Link from "next/link";

export const Events = () => {
  const events = useNostrStore.use.events();
  console.log("events", events);
  return (
    <>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Events</h3>
        <div className="flow-root bg-white px-4 py-4 shadow sm:rounded-md sm:px-6">
          <ul role="list" className="-mb-8">
            {events.map((activityItem, activityItemIdx) => (
              <li key={activityItem.id}>
                <div className="relative pb-8">
                  {activityItemIdx !== events.length - 1 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    {events.map((event) => (
                      <EventComponent event={event} key={event.id} />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const EventComponent = (props: { event: BlaBlaEvent }) => {
  console.log("eventComponent", props.event);
  const { data: profileData } = useProfile({ pubkey: props.event.pubkey });
  return (
    <div className="card w-128 bg-base-100 shadow-xl">
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
          <div className="mt-2 text-sm text-gray-400">
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

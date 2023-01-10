import type { BlaBlaEvent } from "../store";
import { useNostrStore } from "../store";
import { useProfile } from "nostr-react";
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
  const { data: profileData } = useProfile({ pubkey: props.event.pubkey });
  return (
    <div className="card w-128 bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.event.pubkey}`}>
          <div className="card-title hover:bg-base-200">
            <div className="relative">
              <img
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                src={
                  profileData?.picture
                    ? profileData?.picture
                    : "/images/placeholder.png"
                }
                alt=""
              />
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
        </div>
      </div>
    </div>
  );
};

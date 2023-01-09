import type { BlaBlaEvent } from "../store";
import { useNostrStore } from "../store";
import Image from "next/image";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { useGetNostrPubKeyExternalData } from "../hooks/useGetNostrPubKeyExternalData";
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
  const { data } = useGetNostrPubKeyExternalData(props.event.pubkey);
  return (
    <div className="card w-128 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <div className="relative">
            <Image
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
              fill={true}
              src={data?.image ? data.image : "/images/placeholder.png"}
              alt=""
            />
          </div>
          <div className="truncate text-sm font-medium text-gray-900">
            <Link href={"/"}>
              {data?.name ? data.name : props.event.pubkey}
            </Link>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <p className="mt-0.5 text-sm text-gray-500">
              Commented {new Date(props.event.created_at).toLocaleString()}
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{props.event.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

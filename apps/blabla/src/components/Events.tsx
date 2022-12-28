import { BlaBlaEvent, useNostrStore } from "../store";

export const Events = () => {
  const events = useNostrStore.use.events();
  return (
    <div className="flex flex-col space-y-4 text-white">
      <h1>Events</h1>
      {events.map((event) => (
        <EventComponent event={event} key={event.id} />
      ))}
    </div>
  );
};

export const EventComponent = (props: { event: BlaBlaEvent }) => {
  return (
    <div className="">
      <p>
        <b>ID:</b> {props.event.id}
      </p>
      <p>
        <b>PUBKEY:</b> {props.event.pubkey}
      </p>
      <p>
        <b>CONTENT:</b> {props.event.content}
      </p>
    </div>
  );
};

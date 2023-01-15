import { IdentityInformationCard } from "../pages/identity/[identity]";
import { useAppStore } from "../store/appStore";
import { EventComponent } from "./Events";
import { eventToNoteMapper } from "../store/nostrStore";

export default function SavedProfiles() {
  const following = useAppStore.use.saved().profiles;
  console.log("following", following);
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {following.map((person, index) => (
          <li key={index} className="flex py-4">
            {person?.pubkey && (
              <IdentityInformationCard identity={person?.pubkey} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SavedEvents() {
  const events = useAppStore.use.saved().events;
  console.log("events", events);
  return (
    <div className="flex flex-col space-y-4">
      <h1>Saved profiles</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {events.map(eventToNoteMapper).map((note, index) => (
          <li key={index} className="flex py-4">
            {note?.event && <EventComponent note={note} key={note.event.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

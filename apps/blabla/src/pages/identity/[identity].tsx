import { useRouter } from "next/router";
import { useNostrEvents, useProfile } from "nostr-react";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import { Button } from "../../components/common/common";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";
import { z } from "zod";
import type { NostrProfile } from "../../store/appStore";
import { useAppStore } from "../../store/appStore";
import { eventToNoteMapper } from "../../store/nostrStore";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";

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
  const addOrUpdateSavedProfile = useAppStore.use.addOrUpdateSavedProfile();
  const removeSavedProfile = useAppStore.use.removeSavedProfile();
  const savedProfile = useAppStore.use
    .saved()
    .profiles.find((x) => x.pubkey === props.identity);
  const { data: profileData } = useProfile({
    pubkey: props.identity,
  });
  const handleSave = (profileData: NostrProfile) => {
    addOrUpdateSavedProfile(profileData);
  };
  const handleRemove = (profileData: NostrProfile) => {
    removeSavedProfile(profileData);
  };

  const profile = savedProfile || profileData;

  return (
    <NoSSR>
      <Link href={"/identity/" + props.identity} shallow>
        <div className="card bg-base-100 shadow-xl hover:bg-base-200">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img
                  src={
                    profile?.picture
                      ? profile?.picture
                      : "/images/placeholder.png"
                  }
                />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{profile?.display_name}</h2>
            <h3 className="card-title">{profile?.name}</h3>
            <p>{profile?.about}</p>
            <div className={"flex flex-col md:flex-row"}>
              <div className="badge-outline badge w-56 truncate">
                {profile?.npub}
              </div>
              <div className="badge-outline badge">{profile?.website}</div>
              <div className="badge-outline badge">{profile?.lud16}</div>
            </div>
            <div className="card-actions">
              <div className="btn-group">
                <Button className="btn-sm btn">Follow</Button>
                <Button
                  className="btn-sm btn"
                  onClick={() => {
                    if (savedProfile) {
                      handleRemove({ ...profileData, pubkey: props.identity });
                    } else {
                      handleSave({ ...profileData, pubkey: props.identity });
                    }
                  }}
                >
                  {savedProfile ? (
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
  const { events } = useNostrEvents({
    filter: { authors: [props.identity], limit: 20 },
    enabled: !!props.identity,
  });

  return (
    <div className="flex flex-col space-y-4">
      <h1>Events</h1>
      {events.map(eventToNoteMapper).map((note) => {
        return <EventComponent note={note} key={note.event.id} />;
      })}
    </div>
  );
};

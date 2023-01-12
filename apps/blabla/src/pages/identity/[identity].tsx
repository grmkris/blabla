import { useRouter } from "next/router";
import { useNostrEvents, useProfile } from "nostr-react";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import { Button } from "../../components/common/common";
import { useAppStore } from "../../store";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";
import { z } from "zod";

export const Identity = () => {
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

export default Identity;

export const IdentityView = (props: { identity: string }) => {
  return (
    <NoSSR>
      <div className="mt-5 flex flex-col">
        <IdentityInformationCard identity={props.identity} />
        <IdentityEvents identity={props.identity} />
      </div>
    </NoSSR>
  );
};

export const IdentityInformationCard = (props: { identity: string }) => {
  const addFollowing = useAppStore.use.addFollowing();
  const { data: profileData } = useProfile({
    pubkey: props.identity,
  });
  const handleBookmark = (pubkey: string) => {
    addFollowing({ id: pubkey, publicKey: pubkey });
  };
  return (
    <NoSSR>
      <Link href={"/identity/" + props.identity}>
        <div className="card bg-base-100 shadow-xl hover:bg-base-200">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img
                  src={
                    profileData?.picture
                      ? profileData?.picture
                      : "/images/placeholder.png"
                  }
                />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{profileData?.display_name}</h2>
            <h3 className="card-title">{profileData?.name}</h3>
            <p>{profileData?.about}</p>
            <div className={"flex justify-between"}>
              <div className="badge-outline badge max-w-xs truncate hover:text-clip">
                {profileData?.npub}
              </div>
              <div className="badge-outline badge">{profileData?.website}</div>
              <div className="badge-outline badge">{profileData?.lud16}</div>
            </div>
            <div className="card-actions">
              <div className="btn-group">
                <Button className="btn-sm btn">Follow</Button>
                <Button
                  className="btn-sm btn"
                  onClick={() => {
                    handleBookmark(props.identity);
                  }}
                >
                  Bookmark
                </Button>
                <Button className="btn-sm btn" disabled={true}>
                  Donate
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
      {events.map((event) => {
        return (
          <EventComponent event={{ ...event, seen: false }} key={event.id} />
        );
      })}
    </div>
  );
};

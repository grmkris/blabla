import { useRouter } from "next/router";
import { useNostrEvents, useProfile } from "nostr-react";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import { Button } from "../../components/common/common";
import { useAppStore } from "../../store";
import Link from "next/link";
import NoSSR from "../../components/NoSSR";

export const Identity = () => {
  // get identity id from url
  const router = useRouter();
  const { param } = router.query;
  const identity = (param as string) ?? "";
  console.log("identity", identity);
  const { events } = useNostrEvents({
    filter: { authors: [identity], limit: 20 },
    enabled: !!identity,
  });
  return (
    <Layout>
      <div className="mt-5 flex flex-col">
        <ProfileCard identity={identity as string} />
      </div>

      <div className="flex flex-col space-y-4">
        <h1>Events</h1>
        {events.map((event) => {
          return (
            <EventComponent event={{ ...event, seen: false }} key={event.id} />
          );
        })}
      </div>
    </Layout>
  );
};

export default Identity;

export const ProfileCard = (props: { identity: string }) => {
  const addFollowing = useAppStore.use.addFollowing();
  console.log("props.identity", props.identity);
  const { data: profileData } = useProfile({
    pubkey: props.identity,
  });
  const handleBookmark = (pubkey: string) => {
    addFollowing({ id: pubkey, publicKey: pubkey });
  };
  return (
    <NoSSR>
      <Link href={"/identity/" + props.identity}>
        <div className="w-120 card bg-base-100 shadow-xl hover:bg-base-200">
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
          <div className="max-w-120 card-body items-center text-center">
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
                <Button className="btn btn-sm">Follow</Button>
                <Button
                  className="btn btn-sm"
                  onClick={() => {
                    handleBookmark(props.identity);
                  }}
                >
                  Bookmark
                </Button>
                <Button className="btn btn-sm" disabled={true}>
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

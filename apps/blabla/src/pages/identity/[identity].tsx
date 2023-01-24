import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { z } from "zod";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useSqlite } from "../../hooks/useSqlite";
import { useEvents } from "../../hooks/useEvents";
import NoSSR from "../../components/common/NoSSR";
import { Button } from "../../components/common/Button";
import { EventComponent } from "../../components/event-view/EventComponent";
import { useNostrRelayPool } from "../../hooks/useNostrRelayPool";

export const IdentityPage = () => {
  // get identity id from url
  const router = useRouter();
  const { identity } = router.query;
  const parsed = z.string().safeParse(identity);
  return (
    <Layout title={""}>
      <div className="flex flex-col space-y-4">
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
  const { profile, isBookmarked, bookmarkProfile, unbookmarkProfile } =
    useSqlite({
      pubkey: props.identity,
    });
  const handleBookmarkProfileClicked = () => {
    const bookmarked = isBookmarked();
    if (bookmarked) {
      console.log("unbookmark", isBookmarked());
      unbookmarkProfile.mutate(props.identity);
    } else {
      console.log("bookmark");
      bookmarkProfile.mutate(props.identity);
    }
  };

  return (
    <NoSSR>
      <Link href={"/identity/" + props.identity} shallow>
        <div className="card bg-base-100 shadow-xl hover:bg-base-200">
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-24 rounded-xl">
                <img
                  src={
                    profile?.data?.picture
                      ? profile?.data?.picture
                      : "/images/placeholder.png"
                  }
                />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{profile?.data?.display_name}</h2>
            <h3 className="card-title">{profile?.data?.name}</h3>
            <p>{profile?.data?.about}</p>
            <div className={"flex flex-col md:flex-row"}>
              <div className="badge badge-outline w-56 truncate">
                {profile?.data?.npub}
              </div>
              <div className="badge badge-outline">
                {profile?.data?.website}
              </div>
              <div className="badge badge-outline">{profile?.data?.lud16}</div>
            </div>
            <div className="card-actions">
              <div className="btn-group">
                <Button className="btn-sm btn">Follow</Button>
                <Button
                  className="btn-sm btn"
                  onClick={handleBookmarkProfileClicked}
                >
                  {isBookmarked() ? (
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
  const { eventsByPubkey } = useEvents({ pubkey: props.identity });
  const { retrievePubkeyInfos } = useNostrRelayPool();

  if (eventsByPubkey.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col space-y-4">
      <h1>Events</h1>
      <Button onClick={() => retrievePubkeyInfos({ author: props.identity })}>
        {" "}
        Retrieve pubkey infos
      </Button>
      {eventsByPubkey?.data?.pages.map((page) =>
        page.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => eventsByPubkey.fetchNextPage()}>Load more</Button>
    </div>
  );
};

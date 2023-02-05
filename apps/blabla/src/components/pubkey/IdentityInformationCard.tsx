import { useNostrRelayPool } from "../../hooks/nostr-relay-pool/useNostrRelayPool";
import { usePubkey } from "../../hooks/usePubkey";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import { hashTagAttacher } from "../event-view/event.utills";
import { Button } from "../common/Button";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { useIdentityViewStore } from "./pubkey.store";
import { shallow } from "zustand/shallow";

export const IdentityInformationCard = (props: {
  identity: string;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
}) => {
  const { retrievePubkeyTexts, retrievePubkeyInfos, retrievePubkeyMetadata } =
    useNostrRelayPool();
  const { profile, bookmarkProfile, followProfile, unbookmarkProfile } =
    usePubkey({
      pubkey: props.identity,
    });

  const followingCount = useIdentityViewStore(
    (state) =>
      state.identities.find((i) => i.identity === props.identity)?.following
        .length,
    shallow
  );

  const followersCount = useIdentityViewStore(
    (state) =>
      state.identities.find((i) => i.identity === props.identity)?.followers
        .length,
    shallow
  );

  const handleBookmarkProfileClicked = () => {
    const bookmarked = profile.data?.is_bookmarked;
    bookmarked
      ? unbookmarkProfile.mutate(props.identity)
      : bookmarkProfile.mutate(props.identity);
  };

  const handleRefresh = async () => {
    retrievePubkeyTexts.mutate({
      author: [props.identity],
    });
    retrievePubkeyMetadata.mutate({ author: props.identity });
    retrievePubkeyInfos.mutate({
      author: props.identity,
    });
  };
  const handleFollowClicked = () => {
    followProfile.mutate({
      pubkeys: [props.identity],
    });
  };
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
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
          {/* Followrs and Following */}
          <div className="flex flex-row justify-center space-x-4">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl">{followersCount}</h3>
              <h3 className="text-sm">Followers</h3>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl">{followingCount}</h3>
              <h3 className="text-sm">Following</h3>
            </div>
          </div>
          <div className={"items-left max-w-prose text-left"}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkImages, hashTagAttacher]}
              components={{
                a: ({ node, ...props }) => {
                  return (
                    <a
                      className={"text-blue-500 hover:text-blue-700"}
                      {...props}
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  );
                },
              }}
            >
              {profile?.data?.about ?? ""}
            </ReactMarkdown>
          </div>
          <div className={"flex flex-col md:flex-row"}>
            <div className="badge-outline badge w-56 truncate">
              {profile?.data?.npub}
            </div>
            <div className="badge-outline badge">{profile?.data?.website}</div>
            <div className="badge-outline badge">{profile?.data?.lud16}</div>
          </div>
          <div className="card-actions">
            <div className="btn-group">
              <Button className="btn-sm btn" onClick={handleFollowClicked}>
                Follow
              </Button>
              <Button
                className="btn-sm btn"
                onClick={handleBookmarkProfileClicked}
              >
                {profile.data?.is_bookmarked ? (
                  <BookmarkSlashIcon className="h-5 w-5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </Button>
              <Button className="btn-sm btn" onClick={handleRefresh}>
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

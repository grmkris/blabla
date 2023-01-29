import { usePubkey } from "../hooks/usePubkey";
import { ProfileAvatar } from "./event-view/EventComponent";
import { Button } from "./common/Button";
import Link from "next/link";
import { LoadingSpinner } from "./common/LoadingSpinner";

export const IdentityPreview = (props: { identity: string }) => {
  const { profile, bookmarkProfile, followProfile, unbookmarkProfile } =
    usePubkey({
      pubkey: props.identity,
    });

  const handleBookmarkProfileClicked = () => {
    console.log("bookmarkProfile", profile.data?.is_bookmarked);
    profile.data?.is_bookmarked
      ? unbookmarkProfile.mutate(props.identity)
      : bookmarkProfile.mutate(props.identity);
  };

  const handleFollowProfileClicked = () => {
    followProfile.mutate(props.identity);
  };

  if (profile.isLoading)
    return (
      <div className="flew-row flex text-gray-600">
        <LoadingSpinner size={50} />
        {props.identity}
      </div>
    );

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <ProfileAvatar picture={profile.data?.picture} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-600">
          {profile.data?.display_name ?? profile.data?.pubkey}
        </p>
        <p className="truncate text-sm text-gray-500">
          {"@" + profile.data?.name}
        </p>
        <p className="truncate text-xs text-gray-300">
          {profile.data?.display_name && "@" + profile.data?.pubkey}
        </p>
      </div>
      <div>
        <Button onClick={() => followProfile.mutate(props.identity)}>
          Follow
        </Button>
        <Button onClick={handleBookmarkProfileClicked}>
          {profile.data?.is_bookmarked ? "Unbookmark" : "Bookmark"}
        </Button>
        <Link href={`/identity/?id=${props.identity}`}>
          <Button>Open</Button>
        </Link>
      </div>
    </div>
  );
};

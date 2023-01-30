import { usePubkey } from "../../hooks/usePubkey";
import { Button } from "../common/Button";
import { ProfileAvatar } from "../event-view/EventComponent";
import Link from "next/link";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";

export const IdentityPreview = (props: { identity: string }) => {
  const { profile, bookmarkProfile, followProfile, unbookmarkProfile } =
    usePubkey({
      pubkey: props.identity,
    });

  const handleBookmarkProfileClicked = () => {
    profile.data?.is_bookmarked
      ? unbookmarkProfile.mutate(props.identity)
      : bookmarkProfile.mutate(props.identity);
  };

  const handleFollowProfileClicked = () => {
    followProfile.mutate({
      pubkeys: [props.identity],
    });
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
      <div className={"btn-group"}>
        <Button onClick={handleFollowProfileClicked}>Follow</Button>
        <Button onClick={handleBookmarkProfileClicked}>
          {profile.data?.is_bookmarked ? (
            <BookmarkSlashIcon className="h-5 w-5" />
          ) : (
            <BookmarkIcon className="h-5 w-5" />
          )}
        </Button>
        <Button>
          <Link href={`/identity/?id=${props.identity}`}>Open</Link>
        </Button>
      </div>
    </div>
  );
};

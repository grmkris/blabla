import { useSqlite } from "../hooks/useSqlite";
import { ProfileAvatar } from "./event-view/EventComponent";
import { Button } from "./common/Button";
import Link from "next/link";

export const IdentityPreview = (props: { identity: string }) => {
  const {
    profile,
    bookmarkProfile,
    followProfile,
    bookmarkedProfiles,
    unbookmarkProfile,
  } = useSqlite({
    pubkey: props.identity,
  });

  const isBookmarked =
    bookmarkedProfiles.data?.some((x) => x.pubkey === props.identity) ?? false;
  const handleBookmarkProfileClicked = () => {
    console.log("bookmarkProfile", isBookmarked);
    isBookmarked
      ? unbookmarkProfile.mutate(props.identity)
      : bookmarkProfile.mutate(props.identity);
  };

  const handleFollowProfileClicked = () => {
    followProfile.mutate(props.identity);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <ProfileAvatar picture={profile.data?.picture} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">
          {profile.data?.display_name}
        </p>
        <p className="truncate text-sm text-gray-500">
          {"@" + profile.data?.name}
        </p>
        <p className="truncate text-xs text-gray-300">
          {"@" + profile.data?.pubkey}
        </p>
      </div>
      <div>
        <Button onClick={() => followProfile.mutate(props.identity)}>
          Follow
        </Button>
        <Button onClick={handleBookmarkProfileClicked}>
          {isBookmarked ? "Unbookmark" : "Bookmark"}
        </Button>
        <Link href={`/identity/?id=${props.identity}`}>
          <Button>Open</Button>
        </Link>
      </div>
    </div>
  );
};

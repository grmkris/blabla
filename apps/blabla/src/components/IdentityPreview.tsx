import { useSqlite } from "../hooks/useSqlite";
import { ProfileAvatar } from "./event-view/EventComponent";
import { Button } from "./common/Button";
import Link from "next/link";

export const IdentityPreview = (props: { identity: string }) => {
  const { profile, bookmarkProfile, followProfile } = useSqlite({
    pubkey: props.identity,
  });

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
        <Button onClick={() => bookmarkProfile.mutate(props.identity)}>
          Bookmark
        </Button>
        <Link href={`/identity/${props.identity}`}>
          <Button>Open</Button>
        </Link>
      </div>
    </div>
  );
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NostrProfileTable } from "../web-sqlite/schema";
import { insertOrUpdateNostrProfile } from "../web-sqlite/client-functions";
import { useNostr } from "nostr-react";
import { get } from "../web-sqlite/sqlite";
import { NostrProfileTableSchema } from "../web-sqlite/schema";

export const useSqlite = (props: { pubkey?: string }) => {
  const { publish } = useNostr();
  const queryClient = useQueryClient();
  const bookmarkProfile = useMutation(async (profile: NostrProfileTable) => {
    await insertOrUpdateNostrProfile(profile);
    await queryClient.invalidateQueries(["bookmarkedProfiles"]);
    await queryClient.invalidateQueries(["bookmarkedEvents"]);
  });

  const followProfile = useMutation(async (profile: NostrProfileTable) => {
    /*publish({
      kind: "follow",

    }*/
    console.log("TODO Follow profile", profile);
  });

  const bookmarkedProfiles = useQuery({
    queryKey: ["bookmarkedProfiles"],
    queryFn: async () => {
      const select = `select * from nostr_profiles`;
      const res1 = (await get(select)) as any[];
      const profiles: NostrProfileTable[] = res1[0].map((x) =>
        NostrProfileTableSchema.parse(x)
      );
      return profiles;
    },
    refetchInterval: false,
  });

  const profile = useQuery({
    queryKey: ["bookmarkedProfile", props?.pubkey],
    queryFn: async () => {
      const select = `select * from nostr_profiles where pubkey = ${props.pubkey}`;
      console.log("selectbookmarkedProfile", select);
      const res1 = (await get(select)) as any[];
      const profiles: NostrProfileTable[] = res1[0].map((x) =>
        NostrProfileTableSchema.parse(x)
      );
      return profiles[0];
    },
    enabled: !!props?.pubkey,
  });

  return {
    bookmarkProfile,
    followProfile,
    bookmarkedProfiles,
    profile,
  };
};

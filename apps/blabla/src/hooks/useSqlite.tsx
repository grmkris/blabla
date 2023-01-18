import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNostr } from "nostr-react";
import { api } from "../web-sqlite/sqlite";
import { useCallback } from "react";

export const useSqlite = (props: { pubkey?: string }) => {
  const queryClient = useQueryClient();
  const bookmarkProfile = useMutation(async (pubkey: string) => {
    await api.bookmarkProfile(pubkey);
    await queryClient.invalidateQueries();
  });
  const unbookmarkProfile = useMutation(async (pubkey: string) => {
    await api.unbookmarkProfile(pubkey);
    await queryClient.invalidateQueries();
  });

  const followProfile = useMutation(async (pubkey: string) => {
    console.log("TODO Follow profile", pubkey);
  });

  const bookmarkedProfiles = useQuery({
    queryKey: ["bookmarkedProfiles"],
    queryFn: async () => {
      return api.getBookmarkedProfiles();
    },
    refetchInterval: false,
  });

  const profile = useQuery({
    queryKey: ["nostrProfile", props?.pubkey],
    queryFn: async () => {
      const profile = await api.getNostrProfile(props.pubkey);
      console.log("nostrProfile", profile);
      if (!profile) throw new Error("No profile found");
      return profile;
    },
    enabled: !!props?.pubkey,
  });

  const isBookmarked = useCallback(() => {
    if (!props.pubkey || !bookmarkedProfiles.data) return false;
    return bookmarkedProfiles.data.some((x) => x.pubkey === props.pubkey);
  }, [props.pubkey, bookmarkedProfiles.data]);

  return {
    bookmarkProfile,
    followProfile,
    bookmarkedProfiles,
    profile,
    isBookmarked,
    unbookmarkProfile,
  };
};

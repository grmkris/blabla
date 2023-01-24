import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useCallback } from "react";
import { useNostrRelayPool } from "./nostr-relay-pool/useNostrRelayPool";

export const useSqlite = (props: { pubkey?: string }) => {
  const queryClient = useQueryClient();
  const { retrievePubkeyMetadata } = useNostrRelayPool();

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
      if (!props?.pubkey) return;
      const profile = await api.getNostrProfile(props.pubkey);
      console.log("nostrProfile", profile, props.pubkey);
      if (!profile) {
        console.warn("No profile found for pubkey", props.pubkey);
        await retrievePubkeyMetadata({ author: props.pubkey });
      }
      return profile;
    },
    enabled: !!props?.pubkey,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { useNostrRelayPool } from "./nostr-relay-pool/useNostrRelayPool";

export const usePubkey = (props: { pubkey?: string }) => {
  const queryClient = useQueryClient();
  const { retrievePubkeyMetadata, ready } = useNostrRelayPool();

  const toggleBlocked = useMutation(
    async (pubkey: string, blocked?: boolean) => {
      await api.toggleBlocked(pubkey, blocked ?? true);
    }
  );
  const bookmarkProfile = useMutation(async (pubkey: string) => {
    await api.bookmarkProfile(pubkey);
    await queryClient.invalidateQueries(["usePubkey.nostrProfile", pubkey]);
  });
  const unbookmarkProfile = useMutation(async (pubkey: string) => {
    await api.unbookmarkProfile(pubkey);
    await queryClient.invalidateQueries(["usePubkey.nostrProfile", pubkey]);
  });

  const followProfile = useMutation(async (pubkey: string) => {
    console.log("TODO Follow profile", pubkey);
  });

  const unfollowProfile = useMutation(async (pubkey: string) => {
    console.log("TODO Unfollow profile", pubkey);
  });

  const profile = useQuery({
    queryKey: ["usePubkey.nostrProfile", props?.pubkey],
    queryFn: async () => {
      if (!props?.pubkey) return;
      const profileDb = await api.getNostrProfile(props.pubkey);
      console.log("usePubkey.nostrProfile", profileDb);
      if (!profileDb) {
        console.warn("usePubkey-No profile found for pubkey", props.pubkey);
        await retrievePubkeyMetadata.mutate({
          author: props.pubkey,
        });
      }
      return profileDb;
    },
    enabled: !!props?.pubkey && ready,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    profile,
    followProfile,
    unfollowProfile,
    bookmarkProfile,
    unbookmarkProfile,
    toggleBlocked,
  };
};

const PAGE_SIZE = 20;

export const usePubkeyFollowers = (props: { pubkey: string }) => {
  const { pubkey } = props;
  const followers = useInfiniteQuery({
    queryKey: ["usePubkeyFollowers", pubkey],
    queryFn: async ({ pageParam = 0 }) => {
      const followers = await api.getFollowers({
        pubkey,
        pageParam,
        pageSize: 20,
      });
      return followers.map((follower) => {
        return follower.follower;
      });
    },
    enabled: !!pubkey,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.length === PAGE_SIZE
        ? (allPages.length - 1) * PAGE_SIZE
        : undefined;
    },
  });
  const count = useQuery({
    queryKey: ["usePubkeyFollowersCount", pubkey],
    queryFn: async () => {
      const count = await api.getFollowersCount(pubkey);
      return count;
    },
  });
  return {
    followers,
    count,
  };
};

export const usePubkeyFollowing = (props: { pubkey: string }) => {
  const { pubkey } = props;
  const following = useInfiniteQuery({
    queryKey: ["usePubkeyFollowing", pubkey],
    queryFn: async ({ pageParam = 0 }) => {
      const following = await api.getFollowing({
        pubkey,
        pageParam,
        pageSize: 20,
      });
      return following.map((follower) => {
        return follower.pubkey;
      });
    },
    enabled: !!pubkey,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE
        ? allPages.length * PAGE_SIZE
        : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return firstPage.length === PAGE_SIZE
        ? (allPages.length - 1) * PAGE_SIZE
        : undefined;
    },
  });
  const count = useQuery({
    queryKey: ["usePubkeyFollowingCount", pubkey],
    queryFn: async () => {
      const count = await api.getFollowingCount(pubkey);
      return count;
    },
  });
  return {
    following,
    count,
  };
};

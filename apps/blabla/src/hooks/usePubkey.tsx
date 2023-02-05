import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import {
  dateToUnix,
  useNostrRelayPool,
} from "./nostr-relay-pool/useNostrRelayPool";
import { getEventHash, Kind, signEvent } from "nostr-tools";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Event as NostrEvent } from "nostr-tools/event";
import { useAppStore } from "../AppStore";
import { useWindowNostr } from "./useWindowNostr";
import toast from "react-hot-toast";

export const usePubkey = (props: { pubkey?: string }) => {
  const queryClient = useQueryClient();
  const { retrievePubkeyMetadata, ready, publish } = useNostrRelayPool();
  const {
    signEvent: signEventWindow,
    windowNostr,
    following,
  } = useWindowNostr();
  const identities = useAppStore.use.localProfiles();

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

  const followProfile = useMutation(
    async (variables: { pubkeys: string[] }) => {
      console.log("followProfile12345", { asd: variables.pubkeys, following });
      const { pubkeys } = variables;
      // gets typesafe data when form is submitted
      const tags = [];
      for (const pubkey of [...pubkeys, ...following]) {
        tags.push(["p", pubkey]);
      }
      let event: NostrEvent = {
        content: "",
        kind: Kind.Contacts,
        tags: tags,
        created_at: dateToUnix(),
        pubkey: "",
      };
      console.log("followProfile122", { event, identities, windowNostr });
      if (windowNostr) {
        event = await signEventWindow.mutateAsync(event);
      } else {
        event.pubkey = identities[0].publicKey;
        event.id = getEventHash(event);
        event.sig = signEvent(event, identities[0].privateKey);
      }
      if (!event.id) {
        throw new Error("event.id is missing");
      }
      await publish.mutateAsync({ event });
      let eventFromDb = await api.getEvent(event.id);
      while (!eventFromDb) {
        await new Promise((r) => setTimeout(r, 2000));
        eventFromDb = await api.getEvent(event.id);
      }
      toast.success("Update sent");
    }
  );

  const unfollowProfile = useMutation(async (pubkey: string) => {
    console.log("TODO Unfollow profile", pubkey);
  });

  const profile = useQuery({
    queryKey: ["usePubkey.nostrProfile", props?.pubkey],
    queryFn: async () => {
      if (!props?.pubkey) return;
      const profileDb = await api.getNostrProfile(props.pubkey);
      console.log("usePubkey.nostrProfile", profileDb);
      retrievePubkeyMetadata
        .mutateAsync({
          author: props.pubkey,
        })
        .then((x) => {
          if (
            (x?.name && x.name !== profileDb?.name) ||
            (x?.display_name && x.display_name !== profileDb?.display_name) ||
            (x?.picture && x.picture !== profileDb?.picture)
          ) {
            console.log("usePubkey.nostrProfile123", { x, profileDb });
            queryClient.invalidateQueries([
              "usePubkey.nostrProfile",
              props.pubkey,
            ]);
          }
        });
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

interface IdentityViewInterfaceStore {
  identity: string;
  followers: string[];
  following: string[];
  secondFollows?: string[];
}

const useIdentityViewStore = create<IdentityViewInterfaceStore>()(
  immer((set, get) => ({
    identity: "",
    followers: [],
    following: [],
    secondFollows: [],
  }))
);

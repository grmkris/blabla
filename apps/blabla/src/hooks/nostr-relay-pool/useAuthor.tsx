import { useImmer } from "use-immer";
import { useContext } from "react";
import { NostrSocketContext } from "../../NostrSocketContext";
import { Author, collect } from "nostr-relaypool";
import type { Event } from "nostr-tools";
import { useAppStore } from "../../AppStore";

export const useAuthor = (props: { pubkey?: string }) => {
  const { pubkey } = props;
  const { relayPool } = useContext(NostrSocketContext);
  const nostrRelays = useAppStore.use.saved().nostrRelays.map((x) => x.url);
  const [data, updateData] = useImmer<{
    followers: string[];
    following: string[];
    secondFollows: string[];
  }>({
    followers: [],
    following: [],
    secondFollows: [],
  });

  const getFollows = (props: { pubkey: string }) => {
    if (!props.pubkey || !nostrRelays || !relayPool) {
      return;
    }
    const handleCollectedFollowing = (pubkeys: string[]) => {
      console.log("handleCollectedFollowing: ", pubkeys);
      // remove duplicates
      const uniquePubkeys = [...new Set(pubkeys)];
      updateData((draft) => {
        draft.following = uniquePubkeys;
      });
    };
    const author = new Author(relayPool, nostrRelays, props.pubkey);
    console.log("useEffect - followers: ", author.pubkey);
    author.followsPubkeys(handleCollectedFollowing, 100);
  };

  const getFollowers = (props: { pubkey: string }) => {
    if (!props.pubkey || !nostrRelays || !relayPool) {
      return;
    }
    const handleCollectedFollowers = (events: Event[]) => {
      console.log("handleCollectedFollowers: ", events);
      // remove duplicates
      const uniquePubkeys = [...new Set(events.map((x) => x.pubkey))];
      updateData((draft) => {
        draft.followers = uniquePubkeys;
      });
    };
    const author = new Author(relayPool, nostrRelays, props.pubkey);
    console.log("useEffect - followers: ", author.pubkey);
    author.followers(collect(handleCollectedFollowers), 100, 100);
  };

  const getSecondFollows = (props: { pubkey: string }) => {
    if (!props.pubkey || !nostrRelays || !relayPool) {
      return;
    }
    const handleCollectedSecondFollows = (pubkeys: [string, number][]) => {
      console.log("handleCollectedSecondFollows: ", pubkeys);
      // remove duplicates
      const uniquePubkeys = [...new Set(pubkeys.map((x) => x[0]))];
      updateData((draft) => {
        draft.secondFollows = uniquePubkeys;
      });
    };
    const author = new Author(relayPool, nostrRelays, props.pubkey);
    console.log("useEffect - secondFollows: ", author.pubkey);
    author.secondFollows(handleCollectedSecondFollows, 100);
  };

  return {
    data,
    getFollows,
    getFollowers,
    getSecondFollows,
  };
};

import { shallow } from "zustand/shallow";
import { useCallback, useEffect } from "react";
import { IdentityPreview } from "./IdentityPreview";
import { useNostrRelayPool } from "../../hooks/nostr-relay-pool/useNostrRelayPool";
import { useIdentityViewStore } from "./pubkey.store";

export const FollowersList = (props: { identity: string }) => {
  const { getFollowers, ready } = useNostrRelayPool();
  const followers = useIdentityViewStore(
    (state) =>
      state.identities.find((i) => i.identity === props.identity)?.followers,
    shallow
  );

  const getFollersCB = useCallback(() => {
    console.log("getFollersCB", props.identity)
    getFollowers({pubkey: props.identity});
  }, [props.identity, ready])

  useEffect(() => {
    ready && getFollersCB()
  }, [props.identity, ready]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Followers</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {followers?.map((follower) => {
          return (
            <li key={follower} className="px-4 py-4 sm:px-0">
              {follower && <IdentityPreview identity={follower} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export const FollowsList = (props: { identity: string }) => {
  const { getFollows, ready } = useNostrRelayPool();
  const following = useIdentityViewStore(
    (state) =>
      state.identities.find((i) => i.identity === props.identity)?.following,
    shallow
  );

  const getFollowsCB = useCallback(() => {
    getFollows({pubkey: props.identity});
  }, [props.identity, ready])

  useEffect(() => {
    ready && getFollowsCB()
  }, [props.identity, ready]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Follows</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {following?.map((identity) => {
          return (
            <li key={identity} className="px-4 py-4 sm:px-0">
              {identity && <IdentityPreview identity={identity} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export const SecondFollowsList = (props: { identity: string }) => {
  const { getSecondFollows, relayPool } = useNostrRelayPool();
  const secondsFollows = useIdentityViewStore(
    (state) =>
      state.identities.find((i) => i.identity === props.identity)?.secondFollows,
    shallow
  );

  const getSecondFollowsCB = useCallback(() => {
    getSecondFollows({pubkey: props.identity});
  }, [props.identity, relayPool])

  useEffect(() => {
    relayPool && getSecondFollowsCB()
  }, [props.identity, relayPool]);

  return (
    <div className="flex flex-col space-y-4">
      <h1>Recommended</h1>
      <ul role="list" className="divide-y divide-gray-200">
        {secondsFollows?.map((identity) => {
          return (
            <li key={identity} className="px-4 py-4 sm:px-0">
              {identity && <IdentityPreview identity={identity} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

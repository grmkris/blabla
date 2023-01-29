import NoSSR from "../components/common/NoSSR";
import { Layout } from "../components/Layout";
import { AddRelay } from "../components/relays/AddRelay";
import { Relay } from "../components/relays/Relay";
import { useNostrRelayPool } from "../hooks/nostr-relay-pool/useNostrRelayPool";

export default function Relays() {
  const { relays } = useNostrRelayPool();
  // relays is Map<string, Relay>
  // iterate over elements and render Relay component
  return (
    <Layout title={"Relays"}>
      <NoSSR>
        <RelaysView />
      </NoSSR>
    </Layout>
  );
}

export const RelaysView = () => {
  const { relays } = useNostrRelayPool();
  return (
    <div className={"flex flex-wrap"}>
      <AddRelay />
      {relays &&
        Array.from(relays).map(([id, relay], index) => (
          <Relay
            key={relay.url}
            relay={{
              url: relay.url,
              status: relay.status === 1 ? "connected" : "connecting",
            }}
            index={index}
          />
        ))}
    </div>
  );
};

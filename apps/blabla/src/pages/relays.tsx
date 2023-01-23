import { Relay } from "../components/Relay";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { AddRelay } from "../components/AddRelay";
import { useNostrRelayPool } from "../hooks/useNostrRelayPool";

export default function Relays() {
  const { relays } = useNostrRelayPool();
  // relays is Map<string, Relay>
  // iterate over elements and render Relay component
  return (
    <Layout>
      <NoSSR>
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
      </NoSSR>
    </Layout>
  );
}

import { Relay } from "../components/Relay";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { AddRelay } from "../components/AddRelay";
import { useNostr } from "nostr-react";

export default function Relays() {
  const { connectedRelays } = useNostr();
  return (
    <Layout>
      <NoSSR>
        <div className={"flex flex-wrap"}>
          <AddRelay />
          {connectedRelays.map((relay, index) => (
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

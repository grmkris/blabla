import { Relay } from "../components/Relay";
import { Layout } from "../components/Layout";
import NoSSR from "../components/NoSSR";
import { useNostrRelays } from "../hooks/useNostrRelays";

export default function Relays() {
  const { relayStatus } = useNostrRelays();
  return (
    <Layout>
      <NoSSR>
        <div className={"flex flex-wrap"}>
          {relayStatus.map((relayUrl, index) => (
            <Relay
              key={relayUrl.relayUrl}
              relay={{
                url: relayUrl.relayUrl,
                id: relayUrl.relayUrl,
                status: relayUrl.status,
              }}
              index={index}
            />
          ))}
        </div>
      </NoSSR>
    </Layout>
  );
}

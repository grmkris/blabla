import { Layout } from "../components/Layout";
import NoSSR from "../components/common/NoSSR";
import { UserIdentities } from "../components/settings/UserIdentities";
import { useWebLn } from "../hooks/useWebLn";
import { Button } from "../components/common/Button";
import { useWindowNostr } from "../hooks/useWindowNostr";
import { useSettingsStore } from "../AppStore";
import {
  IdentityView,
} from "../components/pubkey/IdentityView";

export default function Settings() {
  const webLN = useWebLn();
  const { windowNostr, getPublicKey } = useWindowNostr();

  const setWebLNConnection = useSettingsStore.use.setWebLNConnection();
  const setNostrPubKeyNip07 = useSettingsStore.use.setNostrPubKeyNip07();
  const webLNConnection = useSettingsStore.use.webLNConnection();
  const nostrPubKeyNip07 = useSettingsStore.use.nostrPubKeyNip07();

  return (
    <Layout title={"Profile"}>
      <NoSSR>
        <h1 className="m-4 text-2xl font-bold">Profile</h1>
        {nostrPubKeyNip07 && <IdentityView identity={nostrPubKeyNip07} />}
        <Button
          loading={webLN.connect.isLoading}
          onClick={async () => {
            const connect = await webLN.connect.mutateAsync();
            connect.getInfo().then((info) => {
              setWebLNConnection(info.node.alias ?? "Unknown");
            });
          }}
        >
          {webLNConnection && <div className="text-xs">{webLNConnection}</div>}
          {!webLNConnection && "Connect to WebLN"}
        </Button>

        {windowNostr && (
          <Button
            loading={getPublicKey.isLoading}
            onClick={async () => {
              const data = await getPublicKey.mutateAsync();
              data && setNostrPubKeyNip07(data);
            }}
          >
            {nostrPubKeyNip07 && (
              <div className="text-xs">{nostrPubKeyNip07.slice(0, 10)}...</div>
            )}
            {!nostrPubKeyNip07 && "Connect nostr"}
          </Button>
        )}
        <UserIdentities />
      </NoSSR>
    </Layout>
  );
}

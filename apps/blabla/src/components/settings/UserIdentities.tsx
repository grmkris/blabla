import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { IdentityComponent } from "../IdentityComponent";
import { Button } from "../common/Button";
import { useAppStore } from "../../AppStore";

export const UserIdentities = () => {
  const addOrUpdateLocalProfile = useAppStore.use.addOrUpdateLocalProfile();
  const localProfiles = useAppStore.use.localProfiles();
  return (
    <div className="m-4 mb-20 flex flex-col space-y-4">
      <h1 className="max-w-screen-sm text-xl font-bold">Identities</h1>
      {localProfiles.map((identity) => (
        <IdentityComponent identity={identity} key={identity.publicKey} />
      ))}
      <Button
        onClick={() => {
          const sk = generatePrivateKey(); // `sk` is a hex string
          const pk = getPublicKey(sk); // `pk` is a hex string
          addOrUpdateLocalProfile({
            privateKey: sk,
            publicKey: pk,
          });
        }}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Identity
      </Button>
    </div>
  );
};

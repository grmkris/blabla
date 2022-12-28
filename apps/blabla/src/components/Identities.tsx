import { Identity } from "./Identity";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useAppStore } from "../store";
import { Button } from "./common/Input";

export const Identities = () => {
  const addOrUpdatIdentity = useAppStore.use.addOrUpdatIdentity();
  const identities = useAppStore.use.identities();
  return (
    <div className="flex flex-col space-y-4">
      {identities.map((identity) => (
        <Identity identity={identity} key={identity.id} />
      ))}
      <Button
        onClick={() => {
          const sk = generatePrivateKey(); // `sk` is a hex string
          const pk = getPublicKey(sk); // `pk` is a hex string
          addOrUpdatIdentity({
            name: "Identity " + (identities.length + 1),
            id: pk,
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

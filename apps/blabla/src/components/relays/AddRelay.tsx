import { WifiIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export const AddRelay = () => {
  const addOrUpdateRelay = useAppStore.use.addOrUpdateNostrRelay();
  const [relayUrl, setRelayUrl] = useState<string>("");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div>
        <label
          htmlFor="relayUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Relayer Url
        </label>
        <div className="mt-1">
          <Input
            type="text"
            name="relayUrl"
            id="relayUrl"
            placeholder="wss://nostr.rocks"
            value={relayUrl}
            onChange={(e) => setRelayUrl(e.target.value)}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          addOrUpdateRelay({
            url: relayUrl,
            status: "idle",
          });
          setRelayUrl("");
        }}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <WifiIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Connect
      </Button>
    </div>
  );
};

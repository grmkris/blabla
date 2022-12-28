import { WifiIcon } from "@heroicons/react/20/solid";
import { useAppStore } from "../store";
import { useState } from "react";

export const AddRelay = () => {
  const addOrUpdateRelay = useAppStore.use.addOrUpdateRelay();
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
          <input
            type="relayUrl"
            name="relayUrl"
            id="relayUrl"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="wss://nostr.rocks"
            value={relayUrl}
            onChange={(e) => setRelayUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={() => {
          addOrUpdateRelay({
            url: relayUrl,
            id: relayUrl,
            labels: [],
          });
          setRelayUrl("");
        }}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <WifiIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Connect
      </button>
    </div>
  );
};

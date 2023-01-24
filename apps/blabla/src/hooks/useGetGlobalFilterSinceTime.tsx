import { useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";
import { dateToUnix } from "./nostr-relay-pool/useNostrRelayPool";

export const useGetGlobalFilterSinceTime = () => {
  return useQuery({
    queryKey: ["lastEventInDb"],
    queryFn: async () => {
      const lastEventInDb = await api.getLastEventInDb();
      if (!lastEventInDb) return dateToUnix(new Date()) - 200;
      return lastEventInDb.created_at;
    },
  });
};

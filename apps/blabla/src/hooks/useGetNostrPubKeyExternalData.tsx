import { useQuery } from "@tanstack/react-query";
import nostrPeople from "../test.json";
import { NostrElement } from "../components/SearchIdentities";
import { number } from "zod";

export const useGetNostrPubKeyExternalData = (publicKey: string) => {
  return useQuery({
    queryKey: ["nostr", publicKey],
    queryFn: async () => {
      const nostrIdentity = nostrPeople.elements.find(
        (el: NostrElement) => el["data.nPubKey"] === publicKey
      );
      if (!nostrIdentity) {
        throw new Error("Nostr identity not found");
      }
      return {
        name: nostrIdentity["data.screenName"],
        image: nostrIdentity["data.profileImageUrl"],
        description: nostrIdentity["data.user.description"],
      };
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
  });
};

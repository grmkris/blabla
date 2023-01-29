import { useQuery } from "@tanstack/react-query";
import { api } from "../web-sqlite/sqlite";

export const useProfiles = () => {
  const bookmarkedProfiles = useQuery({
    queryKey: ["bookmarkedProfiles"],
    queryFn: async () => {
      return api.getBookmarkedProfiles();
    },
    refetchInterval: false,
  });

  return {
    bookmarkedProfiles,
  };
};

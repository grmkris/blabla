import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IdentityViewInterfaceStore {
  identities: {
    identity: string;
    followers: string[];
    following: string[];
    secondFollows?: string[];
  }[];
  updateIdentity: (props: {
    identity: string;
    followers?: string[];
    following?: string[];
    secondFollows?: string[];
  }) => void;
}

export const useIdentityViewStore = create<IdentityViewInterfaceStore>()(
  immer((set, get) => ({
    identities: [],
    updateIdentity: (props) => {
      const { identity, followers, following, secondFollows } = props;
      const identities = get().identities;
      const index = identities.findIndex((i) => i.identity === identity);
      if (index === -1) {
        identities.push({
          identity,
          followers: followers ?? [],
          following: following ?? [],
        });
      } else {
        if (followers) {
          identities[index].followers = followers;
        }
        if (following) {
          identities[index].following = following;
        }
        if (secondFollows) {
          identities[index].secondFollows = secondFollows;
        }
      }
      set({ identities });
    },
  }))
);

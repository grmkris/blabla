import create from "zustand";
import type { StateStorage } from "zustand/middleware";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { del, get, set } from "idb-keyval";
import type { SubgraphForm } from "./types/types";

// Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, "has been deleted");
    await del(name);
  },
};

export type IGraphNotifyStoreStore = {
  subgraphs: SubgraphForm[];
  addSubgraph: (input: SubgraphForm) => void;
  removeSubgraph: (index: number) => void;
  updateSubgraphs: (inputs: SubgraphForm[]) => void;
  updateSubgraph: (editInput: SubgraphForm) => void;
};

export const useAppStore = create<IGraphNotifyStoreStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          subgraphs: [],
          addSubgraph: (subgraph) =>
            set((state) => {
              state.subgraphs.push(subgraph);
            }),
          removeSubgraph: (index) =>
            set((state) => {
              state.subgraphs.splice(index, 1);
            }),
          // updateSubgraphs should not add duplicates and should update existing subgraphs if they exist
          updateSubgraphs: (subgraphs) =>
            set((state) => {
              for (const subgraph of subgraphs) {
                const index = state.subgraphs.findIndex(
                  (s) => s.indexer === subgraph.indexer
                );
                if (index === -1) {
                  state.subgraphs.push(subgraph);
                } else {
                  state.subgraphs[index] = subgraph;
                }
              }
            }),
          updateSubgraph: (subgraph) =>
            set((state) => {
              const index = state.subgraphs.findIndex(
                (s) => s.indexer === subgraph.indexer
              );

              state.subgraphs[index] = subgraph;
            }),
        }),
        {
          name: "SubgraphObserverStorage",
          getStorage: () => storage,
        }
      )
    )
  )
);

type TagStore = {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
};

export const useTagStore = create<TagStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          tags: ["Production", "Development"],

          addTag: (tag) =>
            set((state) => {
              state.tags.push(tag);
            }),

          removeTag: (index) => {
            set((state) => {
              state.tags.splice(index, 1);
            });
          },
        }),
        {
          name: "TagStorage",
          getStorage: () => storage,
        }
      )
    )
  )
);

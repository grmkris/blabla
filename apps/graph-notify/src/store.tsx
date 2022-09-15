import create  from "zustand";
import {
  devtools,
  persist,
  StateStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Inputs } from "./pages";
import { del, get, set } from "idb-keyval";

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
  inputs: Inputs[];
  setInputs: (inputs: Inputs[]) => void;
  addInput: (input: Inputs) => void;
  removeInput: (index: number) => void;
};

export const useGraphNotifyStore = create<IGraphNotifyStoreStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          inputs: [],
          setInputs: (inputs) => set({ inputs }),
          addInput: (input) =>
            set((state) => {
              state.inputs.push(input);
            }),
          removeInput: (index) =>
            set((state) => {
              state.inputs.splice(index, 1);
            })
        }),
        {
          name: "bear-storage",
          getStorage: () => storage,
        }
      )
    )
  )
);

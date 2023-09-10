import { createStore } from 'zustand';

// ==========================
export type ExampleStoreType = {
  // variable in string form
  stringVariable?: string;
  // variable in boolean form
  booleanVariable: boolean;
  // variable in object form
  objectVariable?: Record<string, any>;
  // variable in array form
  arrayVariable: string[];
  // update string variable into store
  updateString: (input: string) => void;
  // update boolean variable into store
  updateBoolean: (input: boolean) => void;
  // update object variable into store
  updateObject: (input: Record<string, any>) => void;
  // update array variable into store
  updateArray: (input: string[]) => void;
  // reset variables to initial state
  reset: () => void;
};

/**
 * Usually do like example like this link below is enough already
 * https://github.com/pmndrs/zustand#first-create-a-store
 ```ts
 import { create } from 'zustand'

 const useBearStore = create((set) => ({
   bears: 0,
   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
   removeAllBears: () => set({ bears: 0 }),
 }))
 ```
 *
 * Reason to wrapped createStore with `createExampleStore`
 * is to cater for React Context Usage
 */
export type ExampleStoreReturnType = ReturnType<typeof createExampleStore>;
export const createExampleStore = () => {
  return createStore<ExampleStoreType>((set, get) => ({
    stringVariable: '',
    booleanVariable: false,
    objectVariable: {},
    arrayVariable: [],
    updateString: (input) => {
      set({ stringVariable: input });
    },
    updateBoolean: (input) => {
      set({ booleanVariable: input });
    },
    updateObject: (input) => set({ objectVariable: input }),
    updateArray: (items) => {
      set({ arrayVariable: items });
    },
    reset: () => {
      set({
        stringVariable: '',
        booleanVariable: false,
        objectVariable: {},
        arrayVariable: [],
      });
    },
  }));
};

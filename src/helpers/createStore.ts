import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./createSelectors";

export function createPersistentStore<T extends object>(
  key: string,
  initializer: StateCreator<
    T,
    [
      ["zustand/devtools", never],
      ["zustand/persist", unknown],
      ["zustand/immer", never],
    ],
    []
  >,
) {
  return createSelectors(
    create<T>()(
      devtools(
        persist(immer(initializer), {
          name: key,
          partialize: (state) =>
            Object.fromEntries(
              Object.entries(state).filter(
                ([key]) => !["actions"].includes(key),
              ),
            ),
        }),
        { store: key },
      ),
    ),
  );
}

export function createStore<T extends object>(
  key: string,
  initializer: StateCreator<
    T,
    [["zustand/devtools", never], ["zustand/immer", never]],
    []
  >,
) {
  return createSelectors(
    create<T>()(devtools(immer(initializer), { store: key })),
  );
}

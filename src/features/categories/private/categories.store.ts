import { createStore } from "../../../helpers/createStore";
import type { Actions, State } from "./categories.types";

// example for non-persistent store
export const useCategoriesStore = createStore<State & { actions: Actions }>(
  "categories-store",
  (set) => ({
    categories: [],
    actions: {
      add: (category) => {
        set((state) => {
          state.categories.push(category);
        });
      },
      remove: (id) => {
        set((state) => {
          state.categories = state.categories.filter((c) => c.id !== id);
        });
      },
      update: (id, updatedCategory) => {
        set((state) => {
          const index = state.categories.findIndex((c) => c.id === id);
          if (index !== -1) {
            state.categories[index] = {
              ...state.categories[index],
              ...updatedCategory,
            };
          }
        });
      },
    },
  }),
);

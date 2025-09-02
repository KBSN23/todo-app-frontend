import { Actions } from ".";
import { createStore } from "../../../helpers/createStore";
import { type Store } from "./categories.types";

export const useCategoriesStore = createStore<Store>(
  "categories-store",
  (set) => ({
    categories: [],
    error: false,
    loading: false,
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

      fetch: () => Actions.getCategories.action()(set),

      create: (args: Actions.createCategory.Args) =>
        Actions.createCategory.action(args)(set),
    },
  }),
);

import { createAsyncAction } from "../../../../helpers/createAsyncAction";
import type { State } from "../categories.types";

export const URL = "/api/categories";
export const METHOD = "GET";
export type Args = void[];

export const action = createAsyncAction<State, Args>(
  async ({ set }) => {
    const response = await fetch(URL, { method: METHOD });
    const data = await response.json();
    set((state) => {
      state.categories = data;
    });
  },
  {
    onStart: (set) => {
      set((state) => {
        state.loading = true;
      });
    },
    onError: (set) => {
      set((state) => {
        state.error = true;
      });
    },
    onFinally: (set) => {
      set((state) => {
        state.loading = false;
      });
    },
  },
);

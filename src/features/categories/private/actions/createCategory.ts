import { createAsyncAction } from "../../../../helpers/createAsyncAction";
import axios from "axios";
import type { Category, State, Store } from "../categories.types";

export const URL = "/api/category";

export const METHOD = "post";
export type Args = Omit<Category, "id" | "createdAt" | "archived" | "favorite">;
export type Response = null;

export const action = createAsyncAction<Store, Args>(
  async ({ args }) => {
    await axios[METHOD]<Response>(URL, args);
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
        state.actions.fetch();
      });
    },
  },
);

import { createAsyncAction } from "../../../helpers/createAsyncAction";
import type { State } from "./categories.types";

export type Args = void[];

export const fetchAction = createAsyncAction<State, Args>(
  async ({ set }) => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    set((state) => {
      state.categories = data;
      state.loading = false;
    });
  },
  {
    onStart: (set) => {
      set((state) => {
        state.loading = true;
      });
    },
  },
);
// export const fetchAction =
//   () => async (set: (cb: (state: State) => void) => void) => {
//     set((state) => {
//       state.loading = true;
//     });
//   };

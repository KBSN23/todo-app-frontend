import { createPersistentStore } from "../../helpers/createStore";
import type { Actions, State } from "./tasks.types";

export const useTaskStore = createPersistentStore<State & { actions: Actions }>(
  "task-store",
  (set) => ({
    tasks: [],
    actions: {
      addTask: (task: string) => {
        set((state) => {
          state.tasks.push(task);
        });
      },
      removeTask: (task: string) => {
        set((state) => {
          state.tasks = state.tasks.filter((t) => t !== task);
        });
      },
    },
  }),
);

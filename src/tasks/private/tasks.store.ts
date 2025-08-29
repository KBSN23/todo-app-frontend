import { createPersistentStore } from "../../helpers/createStore";

type State = {
  tasks: string[];
};

type Actions = {
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
};

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

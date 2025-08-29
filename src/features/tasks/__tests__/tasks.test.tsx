import { runStoreTests } from "../../../helpers/runStoreTests";
import { useTaskStore } from "../private/tasks.store";

describe("Tasks", () => {
  describe("Actions", () => {
    runStoreTests(useTaskStore, [
      {
        action: "addTask",
        description: "adds a task to an empty list",
        args: ["New Task"],
        state: { tasks: [] },
        expected: { tasks: ["New Task"] },
      },
      {
        action: "removeTask",
        description: "removes a task from the list",
        args: ["Task321"],
        state: { tasks: ["Task123", "Task321"] },
        expected: { tasks: ["Task123"] },
      },
    ]);
  });
});

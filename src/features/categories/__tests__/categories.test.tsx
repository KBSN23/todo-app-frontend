import { runStoreTests } from "../../../helpers/runStoreTests";
import { useCategoriesStore } from "../private/categories.store";

describe("Categories", () => {
  describe("Actions", () => {
    runStoreTests(useCategoriesStore, [
      {
        action: "remove",
        args: ["0"],
        description: "removes category",
        state: {
          categories: [
            { id: "1", name: "Work1", favorite: true, color: "blue" },
            { id: "0", name: "Work", favorite: false, color: "blue" },
          ],
        },
        expected: {
          categories: [
            { id: "1", name: "Work1", favorite: true, color: "blue" },
          ],
        },
      },
      {
        action: "add",
        args: [
          {
            color: "blue",
            name: "Work2",
            favorite: false,
            id: "2",
          },
        ],
        description: "adds category",
        state: {
          categories: [
            { id: "1", name: "Work1", favorite: true, color: "blue" },
            { id: "0", name: "Work", favorite: false, color: "blue" },
          ],
        },
        expected: {
          categories: [
            { id: "1", name: "Work1", favorite: true, color: "blue" },
            { id: "0", name: "Work", favorite: false, color: "blue" },
            { id: "2", name: "Work2", favorite: false, color: "blue" },
          ],
        },
      },
      {
        action: "update",
        args: ["1", { favorite: false }],
        description: "updates category",
        state: {
          categories: [
            { id: "1", name: "Work1", favorite: true, color: "blue" },
            { id: "0", name: "Work", favorite: false, color: "blue" },
          ],
        },
        expected: {
          categories: [
            { id: "1", name: "Work1", favorite: false, color: "blue" },
            { id: "0", name: "Work", favorite: false, color: "blue" },
          ],
        },
      },
    ]);
  });
});

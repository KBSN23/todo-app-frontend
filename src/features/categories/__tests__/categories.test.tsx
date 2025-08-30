import { http, HttpResponse } from "msw";
import { runStoreTests } from "../../../helpers/runStoreTests";
import { server } from "../../../mocks/node";
import { useCategoriesStore } from "../private/categories.store";
import { getCategoriesMock } from "../private/mocks";
import { getCategories } from "../private/actions";

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
          error: false,
          loading: false,
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
          error: false,
          loading: false,
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
          error: false,
          loading: false,
        },
      },
      {
        action: "fetch",
        args: [],
        state: {
          categories: [],
        },
        expected: {
          categories: getCategoriesMock.RESPONSE,
          error: false,
          loading: false,
        },
      },
    ]);

    describe("Error response", () => {
      beforeEach(() => {
        server.use(
          http.get(getCategories.URL, () => {
            return new HttpResponse(null, { status: 500 });
          }),
        );
      });

      runStoreTests(useCategoriesStore, [
        {
          action: "fetch",
          args: [],
          state: {
            categories: [],
          },
          expected: {
            categories: [],
            error: true,
            loading: false,
          },
        },
      ]);
    });
  });
});

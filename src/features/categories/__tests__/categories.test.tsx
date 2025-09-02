import { useCategoriesStore } from "../private/categories.store";
import { act, waitFor } from "@testing-library/react";
import { getCategoriesMock } from "../private/mocks";
import { server } from "../../../mocks/node";
import { http } from "msw";
import { createCategory, getCategories } from "../private/actions";
import { renderStore } from "../../../helpers/runStoreTests";
import { Actions } from "../private";

describe("Categories", () => {
  describe("Actions", () => {
    describe("getCategories", () => {
      it("Success", async () => {
        const { result } = renderStore(useCategoriesStore);
        expect(result.current.categories.length).toBe(0);
        expect(result.current.loading).toBe(false);

        act(() => {
          result.current.actions.fetch();
        });

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
          expect(result.current.categories).toEqual(getCategoriesMock.RESPONSE);

          expect(result.current.loading).toBe(false);
        });
      });

      it("Error", async () => {
        server.use(
          http.get(getCategories.URL, () => {
            return new Response(null, { status: 500 });
          }),
        );

        const { result } = renderStore(useCategoriesStore);

        expect(result.current.loading).toBe(false);
        expect(result.current.categories.length).toBe(0);

        act(() => {
          result.current.actions.fetch();
        });

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
          expect(result.current.error).toBe(true);
          expect(result.current.loading).toBe(false);
        });
      });
    });

    describe("createCategory", () => {
      const newCategory: createCategory.Args = {
        name: "test category",
        color: "#FFFFFF",
        description: "test description",
        icon: "icon123",
      };

      it("Should post category", async () => {
        const createMock = vi.fn();
        server.use(
          http.post(createCategory.URL, async ({ request }) =>
            createMock(await request.clone().json()),
          ),
        );

        const { result } = renderStore(useCategoriesStore);
        expect(result.current.categories.length).toBe(0);
        expect(result.current.loading).toBe(false);

        act(() => {
          result.current.actions.create(newCategory);
        });

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
          expect(createMock).toHaveBeenCalledWith(newCategory);
        });
      });

      it("should fetch categories after creating category", async () => {
        vi.spyOn(Actions.getCategories, "action");

        const { result } = renderStore(useCategoriesStore);

        act(() => {
          result.current.actions.create(newCategory);
        });

        await waitFor(() => {
          expect(Actions.getCategories.action).toHaveBeenCalled();
        });
      });
    });
  });
});

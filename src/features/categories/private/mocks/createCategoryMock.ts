import { http, HttpResponse } from "msw";
import { createCategory } from "../actions";
import { state } from "./state";
import type { Category } from "../categories.types";
import { faker } from "@faker-js/faker";

export const RESPONSE = null;

export const createCategoryMock = http.post(
  createCategory.URL,
  async ({ request }) => {
    const body: createCategory.Args = await request.clone().json();
    const newCategory: Category = {
      ...body,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString(),
      favorite: false,
      archived: false,
    };

    state.categories.push(newCategory);
    return HttpResponse.json(RESPONSE);
  },
);

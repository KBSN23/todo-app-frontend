import { http, HttpResponse } from "msw";
import { getCategories } from "../actions";
import type { Category } from "../categories.types";
import { state } from "./state";

export const RESPONSE: Category[] = state.categories;

export const getCategoriesMock = http.get(getCategories.URL, async () => {
  return HttpResponse.json(RESPONSE);
});

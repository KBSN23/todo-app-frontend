import { http, HttpResponse } from "msw";
import { getCategories } from "../actions";

export const RESPONSE = [
  { color: "red", favorite: true, id: "1", name: "Category 1" },
  { color: "blue", favorite: false, id: "2", name: "Category 2" },
];

export const getCategoriesMock = http.get(getCategories.URL, async () => {
  return HttpResponse.json(RESPONSE);
});

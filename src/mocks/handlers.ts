import { http, HttpResponse, delay } from "msw";
import type { Categories } from "../features/categories";

export const handlers = [
  http.get("/api/categories", async () => {
    await delay(1000);
    return HttpResponse.json([
      {
        id: "abc-123",
        name: "Category 1",
        favorite: true,
        color: "red",
      },
      {
        id: "def-456",
        name: "Category 2",
        favorite: false,
        color: "blue",
      },
    ] as Categories.Types.Category[]);
  }),
];

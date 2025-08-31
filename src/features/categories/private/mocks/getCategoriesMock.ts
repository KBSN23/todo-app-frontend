import { http, HttpResponse } from "msw";
import { getCategories } from "../actions";
import type { Category } from "../categories.types";

export const RESPONSE: Category[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Work",
    color: "#3B82F6",
    favorite: true,
    description: "Tasks related to work and professional projects",
    icon: "briefcase",
    archived: false,
    createdAt: new Date("2024-01-15T10:30:00Z").toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Personal",
    color: "#10B981",
    favorite: false,
    description: "Personal tasks and daily activities",
    icon: "user",
    archived: false,
    createdAt: new Date("2024-01-16T14:20:00Z").toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Shopping",
    color: "#F59E0B",
    favorite: true,
    description: "Shopping lists and errands",
    icon: "shopping-cart",
    archived: false,
    createdAt: new Date("2024-01-17T09:15:00Z").toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Health",
    color: "#EF4444",
    favorite: false,
    description: "Health-related appointments and activities",
    icon: "heart",
    archived: false,
    createdAt: new Date("2024-01-18T16:45:00Z").toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Learning",
    color: "#8B5CF6",
    favorite: true,
    description: "Educational tasks and skill development",
    icon: "book",
    archived: false,
    createdAt: new Date("2024-01-19T11:00:00Z").toISOString(),
  },
];

export const getCategoriesMock = http.get(getCategories.URL, async () => {
  return HttpResponse.json(RESPONSE);
});

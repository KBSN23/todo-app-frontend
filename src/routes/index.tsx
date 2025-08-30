import { createFileRoute } from "@tanstack/react-router";
import { useCategoriesStore } from "../features/categories/private/categories.store";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const categories = useCategoriesStore.use.categories();
  const loading = useCategoriesStore.use.loading();
  const { fetch } = useCategoriesStore.use.actions();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {loading && <p>Loading...</p>}
      {categories.map((category) => (
        <div key={category.id}>
          <h4>{category.name}</h4>
          <p>Favorite: {category.favorite ? "Yes" : "No"}</p>
          <p>Color: {category.color}</p>
        </div>
      ))}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useCategoriesStore } from "../categories/private/categories.store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const categories = useCategoriesStore.use.categories();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
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

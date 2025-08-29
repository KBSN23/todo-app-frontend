import { useCategoriesStore } from "../../categories/private/categories.store";
import { renderRoute } from "../renderRoute";

describe("IndexPage", () => {
  it("should render welcome home", async () => {
    const { findByRole } = renderRoute("/");
    const heading = await findByRole("heading", { name: /welcome home/i });
    expect(heading).toBeInTheDocument();
  });

  it("should render categories", async () => {
    useCategoriesStore.setState({
      categories: [
        { id: "1", name: "Category 1", favorite: true, color: "red" },
        { id: "2", name: "Category 2", favorite: false, color: "blue" },
      ],
    });

    const { findByText } = renderRoute("/");
    const category1 = await findByText("Category 1");
    const category2 = await findByText("Category 2");

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });
});

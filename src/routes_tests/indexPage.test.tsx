import { getCategoriesMock } from "../features/categories/private/mocks";
import { renderRoute } from "../helpers/renderRoute";

describe("IndexPage", () => {
  it("should render welcome home", async () => {
    const { findByRole } = renderRoute("/");
    const heading = await findByRole("heading", { name: /welcome home/i });
    expect(heading).toBeInTheDocument();
  });

  it("should render categories", async () => {
    const { findByText } = renderRoute("/");
    const category1 = await findByText(getCategoriesMock.RESPONSE[0].name);
    const category2 = await findByText(getCategoriesMock.RESPONSE[1].name);

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });
});

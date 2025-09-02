import * as getCategoriesMock from "./getCategoriesMock";
import * as createCategoryMock from "./createCategoryMock";

export { getCategoriesMock, createCategoryMock };
export const handlers = [
  getCategoriesMock.getCategoriesMock,
  createCategoryMock.createCategoryMock,
];

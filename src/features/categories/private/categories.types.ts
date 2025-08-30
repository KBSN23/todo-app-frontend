export type Category = {
  id: string;
  name: string;
  favorite: boolean;
  color: string;
};

export type State = {
  categories: Category[];
  loading: boolean;
  error: boolean;
};

export type Actions = {
  add: (category: Category) => void;
  remove: (id: Category["id"]) => void;
  update: (id: Category["id"], updatedCategory: Partial<Category>) => void;
  fetch: () => Promise<void>;
};

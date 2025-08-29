export type Category = {
  id: string;
  name: string;
  favorite: boolean;
  color: string;
};

export type State = {
  categories: Category[];
};

export type Actions = {
  add: (category: Category) => void;
  remove: (id: Category["id"]) => void;
  update: (id: Category["id"], updatedCategory: Partial<Category>) => void;
};

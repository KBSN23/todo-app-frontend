import z from "zod";

export const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(100),
  color: z.string().min(7).max(7),
  favorite: z.boolean(),
  description: z.string().max(500).optional(),
  icon: z.string().min(1).max(50).optional(), // TODO: implement icons
  archived: z.boolean().default(false),
  createdAt: z.iso.date(),
});

export type Category = z.infer<typeof CategorySchema>;

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

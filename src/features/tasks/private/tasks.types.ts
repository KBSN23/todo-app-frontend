import z from "zod";

export const TaskStatusSchema = z.enum(["pending", "in_progress", "done"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskPrioritySchema = z.enum(["low", "medium", "high"]);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
export const TaskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  status: TaskStatusSchema.default("pending"),
  priority: TaskPrioritySchema.default("medium"),
  createdAt: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  categoryIds: z.array(z.uuid()).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export type State = {
  tasks: Task[];
};

export type Actions = {
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  removeTask: (task: Task["id"]) => void;
};

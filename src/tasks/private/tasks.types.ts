export type State = {
  tasks: string[];
};

export type Actions = {
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
};

import { Tasks } from "./tasks";

const App = () => {
  const { actions, tasks } = Tasks.Store.useTaskStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello, Tailwind World
      </h1>
      <div>
        {tasks.map((task) => (
          <div key={task}>{task}</div>
        ))}
      </div>
      <div>
        <button
          className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => actions.addTask("New Task")}
        >
          Add task
        </button>
        <button
          className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => actions.removeTask("New Task")}
        >
          Remove task
        </button>
      </div>
    </div>
  );
};

export default App;

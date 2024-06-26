import React, { ChangeEvent, FormEvent } from "react";
import { priorities } from "./assets/config";
import { tasks } from "./api/tasks";
import { TaskResponse } from "./types";

function App() {
  const initialState = {
    name: "",
    priority: "",
  };
  const [task, setTask] = React.useState(initialState);
  const [data, setData] = React.useState<TaskResponse[]>([]);
  const [filter, setFilter] = React.useState("all");

  const fetchTasks = () => {
    tasks
      .getAll()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setTask({
      ...task,
      [name]: value,
    });

    console.log(task);
  };

  const createNewTask = () => {
    tasks
      .createTask(task)
      .then((res) => {
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkTask = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    tasks
      .markTask(id)
      .then((res) => {
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTaskByFilter = (value?: string) => {
    setFilter(value ? value : "all");
    tasks
      .getAll(value)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCompleted = () => {
    setFilter("Clear");
    tasks.getAll().then((res) => {
      const filterData = res.data.filter(
        (currentTask: TaskResponse) => currentTask.status !== "Completada"
      );
      setData(filterData);
    });
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-2/4 mx-auto py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          {/* Title */}
          <h1 className="text-3xl text-white uppercase">Task Control</h1>
        </div>

        <div className="w-full flex flex-col space-y-5">
          <div className="flex flex-col space-y-3 mb-5">
            <div className="flex items-center justify-between gap-3 mb-5">
              <input
                type="text"
                className="w-full px-3 py-4 outline-none bg-neutral-800 text-white border-neutral-800 rounded-lg text-sm"
                name="name"
                onChange={handleChange}
              />
              <select
                name="priority"
                className="p-4 outline-none bg-neutral-800 text-white rounded-lg"
                onChange={handleChange}
              >
                {priorities.map((priority) => (
                  <option value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <button
              className="bg-green-900 text-white py-3 cursor-pointer hover:bg-green-800 transition-all duration-300"
              onClick={createNewTask}
            >
              Guardar
            </button>
          </div>

          {data.length > 0 ? (
            <div className="flex flex-col border border-gray-500/30">
              <div className="flex flex-col">
                {data.map((task) => (
                  <div
                    key={task._id}
                    className="w-full border-b border-gray-500/30 px-8 py-10 flex items-center gap-3 text-gray-500"
                  >
                    <input
                      type="checkbox"
                      name=""
                      id={task._id}
                      className="h-5 w-5"
                      onChange={checkTask}
                      checked={task.status === "Completada"}
                      disabled={task.status === "Completada"}
                    />
                    <span
                      className={`text-lg relative before:absolute before:w-full before:h-[1px] before:top-1/2 before:bg-gray-500 ${
                        task.status === "Completada"
                          ? "before:block"
                          : "before:hidden"
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-8 py-5 grid grid-cols-3 text-white">
                <div className="w-full flex items-center">
                  <span className="text-gray-500">{data.length} tareas</span>
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                  <button
                    className={`px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300 ${
                      filter === "all" && "bg-gray-500/10 text-white "
                    }`}
                    onClick={() => getTaskByFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300 ${
                      filter === "Completada" && "bg-gray-500/10 text-white "
                    }`}
                    onClick={() => getTaskByFilter("Completada")}
                  >
                    Completadas
                  </button>
                  {/* <button
                    className={`px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300 ${
                      filter === "Eliminada" && "bg-gray-500/10 text-white "
                    }`}
                    onClick={() => getTaskByFilter("Eliminada")}
                  >
                    Eliminadas
                  </button> */}
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className={`px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300 ${
                      filter === "Clear" && "bg-gray-500/10 text-white"
                    }`}
                    onClick={clearCompleted}
                  >
                    Limpiar completadas
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center p-10">
              <span className="text-2xl text-white">No hay tareas creadas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

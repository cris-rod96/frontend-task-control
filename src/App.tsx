import React from "react";
import { priorities } from "./assets/config";
import { tasks } from "./api/tasks";
import { TaskResponse } from "./types";

function App() {
  const [data, setData] = React.useState<TaskResponse[]>([]);

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
              />
              <select
                name=""
                id=""
                className="p-4 outline-none bg-neutral-800 text-white rounded-lg"
              >
                {priorities.map((priority) => (
                  <option value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <button className="bg-green-900 text-white py-3 cursor-pointer hover:bg-green-800 transition-all duration-300">
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
                    <input type="checkbox" name="" id="" className="h-5 w-5" />
                    <span>{task.name}</span>
                  </div>
                ))}
              </div>
              <div className="px-8 py-5 grid grid-cols-3 text-white">
                <div className="w-full flex items-center">
                  <span className="text-gray-500">5 tareas</span>
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                  <button className="px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300">
                    All
                  </button>
                  <button className="px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300">
                    Completadas
                  </button>
                  <button className="px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300">
                    Eliminadas
                  </button>
                </div>
                <div className="w-full flex justify-end">
                  <button className="px-3 py-2 border border-gray-500/30 rounded-lg text-sm text-gray-500 hover:bg-gray-500/5 hover:text-white transition-all duration-300">
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

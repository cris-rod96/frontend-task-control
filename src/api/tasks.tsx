import { TaskRequest } from "../types/index.js";
import { instance } from "./base.api.js";
const endpoint = "tasks";

export const tasks = {
  getAll: (value?: string) => {
    if (!value) value = "all";
    return instance.get(`${endpoint}/list?status=${value}`);
  },

  createTask: (task: TaskRequest) => {
    return instance.post(`${endpoint}/create`, { ...task });
  },

  markTask: (id: string) => {
    return instance.put(`${endpoint}/edit/${id}`, { status: "Completada" });
  },
};

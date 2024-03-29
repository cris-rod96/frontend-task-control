import { TaskRequest } from "../types/index.js";
import { instance } from "./base.api.js";
const endpoint = "tasks";

export const tasks = {
  getAll: () => {
    return instance.get(`${endpoint}/list`);
  },

  createTask: (task: TaskRequest) => {
    return instance.post(`${endpoint}/create`, { ...task });
  },
};

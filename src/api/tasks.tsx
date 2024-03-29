import { instance } from "./base.api.js";
const endpoint = "tasks";

export const tasks = {
  getAll: () => {
    return instance.get(`${endpoint}/list`);
  },
};

export type TaskResponse = {
  _id: string;
  name: string;
  priority: string;
  status: string;
};

export type TaskRequest = {
  name: string;
  priority: string;
};

import { api } from "./api";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: string;
}

export interface GetTasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

export const getTasks = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
): Promise<GetTasksResponse> => {
  const query = `?page=${page}&limit=${limit}&search=${search}&status=${status}`;
  return api<GetTasksResponse>(`/tasks${query}`);
};

export const createTask = async (
  title: string,
  description?: string
): Promise<Task> => {
  return api<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  return api<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const toggleTask = async (id: string): Promise<Task> => {
  return api<Task>(`/tasks/${id}/toggle`, {
    method: "PATCH",
  });
};

export const deleteTask = async (id: string): Promise<void> => {
  return api<void>(`/tasks/${id}`, {
    method: "DELETE",
  });
};
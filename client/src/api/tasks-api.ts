import { Task } from "@/models/task";
import { fetchData } from "./api";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetchData("/api/tasks", {
    method: "GET",
  });
  return response.json();
}

export interface TaskInput {
  title: string;
  check: boolean;
}

export async function createTask(task: TaskInput): Promise<Task> {
  const response = await fetchData("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response.json();
}

export async function deleteTask(taskId: string) {
  await fetchData(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export async function updateTask(
  taskId: string,
  task: TaskInput
): Promise<Task> {
  const response = await fetchData(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

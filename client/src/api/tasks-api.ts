import { Task } from "@/models/task";
import { fetchData } from "./api";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetchData("https://candlelight.pittari.de/api/tasks", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export interface TaskInput {
  title: string;
  check: boolean;
  dueDate?: Date;
}

export async function createTask(task: TaskInput): Promise<Task> {
  const response = await fetchData("https://candlelight.pittari.de/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
    credentials: "include",
  });

  return response.json();
}

export async function deleteTask(taskId: string) {
  await fetchData(`https://candlelight.pittari.de/api/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function updateTask(
  taskId: string,
  task: TaskInput
): Promise<Task> {
  const response = await fetchData(
    `https://candlelight.pittari.de/api/tasks/${taskId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(task),
    }
  );
  return response.json();
}

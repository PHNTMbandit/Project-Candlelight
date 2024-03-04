import * as TasksApi from "../api/tasks-api";
import * as UserApi from "../api/users-api";
import { useEffect, useState } from "react";
import { Task as TaskModel } from "../models/task";
import { TaskInput } from "@/api/tasks-api";
import { Add } from "@styled-icons/remix-line/Add";
import Task from "@/components/Task";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        await UserApi.getLoggedInUser();
      } catch (error) {
        window.location.href = "/login";
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await TasksApi.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error(error);
      }
    }
    loadTasks();
  }, []);

  async function createTask(task: TaskInput) {
    try {
      const newTask = await TasksApi.createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function deleteTask(task: TaskModel) {
    try {
      await TasksApi.deleteTask(task._id);
      setTasks(tasks.filter((existingTask) => existingTask._id !== task._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function updateTask(task: TaskModel) {
    try {
      await TasksApi.updateTask(task._id, task);
      setTasks(
        tasks.map((existingTask) =>
          existingTask._id === task._id ? task : existingTask
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="h4-medium">Tasks</h1>
      <div className="space-x-4">
        <button
          onClick={() =>
            createTask({ title: "", check: false, dueDate: new Date() })
          }>
          <Add size={32} />
        </button>
      </div>
      <div>
        {tasks.length > 0 ? (
          <div className="flex flex-wrap items-start gap-10">
            {tasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                onDeleteClick={deleteTask}
                onUpdateTask={updateTask}
              />
            ))}
          </div>
        ) : (
          <p>No new tasks</p>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;

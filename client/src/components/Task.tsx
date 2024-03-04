import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Task as TaskModel } from "../models/task";
import { Trash } from "styled-icons/boxicons-regular";
import { Checkbox } from "./ui/checkbox";
import AutoExpandingTextArea from "./AutoExpandingTextArea";

interface TaskProps {
  task: TaskModel;
  onDeleteClick: (task: TaskModel) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const Task = ({ task, onDeleteClick, onUpdateTask }: TaskProps) => {
  const [titleValue, setTitleValue] = useState(task.title);
  const [checkValue, setCheckValue] = useState(task.check);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(e.target.value);
  };

  const handleCheckChange = (e: boolean) => {
    setCheckValue(e);
  };

  const handleSubmitChange = () => {
    if (task.title !== titleValue || task.check !== checkValue) {
      task.title = titleValue;
      task.check = checkValue;
      onUpdateTask(task);
    }
  };

  let createdUpdatedText: string;
  if (task.updatedAt > task.createdAt) {
    createdUpdatedText = `Updated ${formatDate(task.updatedAt)}`;
  } else {
    createdUpdatedText = `Created ${formatDate(task.createdAt)}`;
  }

  return (
    <div className="flex items-center group gap-3">
      <button
        className="invisible group-hover:visible"
        onClick={() => onDeleteClick(task)}>
        <Trash size={26} />
      </button>
      <div className="flex flex-col gap-4 group w-96 h-full p-4 border-2 rounded-lg outline-primary hover:outline">
        <div className="flex items-center gap-5">
          <Checkbox
            checked={checkValue}
            onCheckedChange={handleCheckChange}
            onPointerLeave={handleSubmitChange}
          />
          <AutoExpandingTextArea
            className={
              checkValue ? "text-green-500" : "text-primary" + "h4-medium"
            }
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
            onPointerLeave={handleSubmitChange}
          />
        </div>
        <p className="text-xs text-muted-foreground">{createdUpdatedText}</p>
      </div>
    </div>
  );
};

export default Task;

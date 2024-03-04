import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Task as TaskModel } from "../models/task";
import { Trash } from "styled-icons/boxicons-regular";
import { Checkbox } from "./ui/checkbox";
import AutoExpandingTextArea from "./AutoExpandingTextArea";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Update } from "@styled-icons/material-sharp/Update";

interface TaskProps {
  task: TaskModel;
  onDeleteClick: (task: TaskModel) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const Task = ({ task, onDeleteClick, onUpdateTask }: TaskProps) => {
  const [titleValue, setTitleValue] = useState(task.title);
  const [checkValue, setCheckValue] = useState(task.check);
  const [dueDateValue, setDueDateValue] = useState<Date | undefined>(
    task.dueDate
  );

  let timeDifferenceString;
  if (dueDateValue !== undefined) {
    const timeDifference =
      new Date(dueDateValue).getTime() - new Date().getTime();
    const daysUntil = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysUntil != undefined) {
      if (daysUntil > 1) {
        timeDifferenceString = `Due in ${daysUntil} days`;
      } else if (daysUntil == 0) {
        timeDifferenceString = `Due Today`;
      } else if (daysUntil < 0) {
        timeDifferenceString = "Overdue";
      } else if (daysUntil == 1) {
        timeDifferenceString = "Due Tomorrow";
      }
    }
  }

  const handleCheckChange = (e: boolean) => {
    setCheckValue(e);
    task.check = e;
    onUpdateTask(task);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(e.target.value);
    task.title = e.target.value;
    onUpdateTask(task);
  };

  const handleDueDateChange = (e: Date | undefined) => {
    setDueDateValue(e);
    task.dueDate = e;
    onUpdateTask(task);
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
      <div className="flex flex-col gap-4 group w-[230px] xl:w-[450px] p-4 border-2 rounded-lg outline-primary hover:outline">
        <div className="flex items-center gap-5">
          <Checkbox
            checked={checkValue}
            onCheckedChange={handleCheckChange}
          />
          <AutoExpandingTextArea
            disabled={checkValue}
            className={
              checkValue ? "text-green-500" : "text-primary" + "h4-medium"
            }
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
          />
        </div>
        {checkValue == false && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-fill justify-start text-left font-normal",
                  !dueDateValue && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDateValue ? (
                  format(dueDateValue, "PPP")
                ) : (
                  <span>Pick a due date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDateValue}
                onSelect={(e) => {
                  handleDueDateChange(e);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
        {checkValue == false && (
          <div className="flex space-x-2 items-center">
            <Update className="xl:size-6 size-4" />
            <p className="p-small">{timeDifferenceString}</p>
          </div>
        )}
        <p className="text-xs xl:text-sm text-muted-foreground">
          {createdUpdatedText}
        </p>
      </div>
    </div>
  );
};

export default Task;

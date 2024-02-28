import { formatDate } from "@/utils/formatDate";
import { Note as NoteModel } from "../models/note";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ReactElement } from "react";
import { Trash } from "styled-icons/boxicons-regular";

interface NoteProps {
  note: NoteModel;
  form: ReactElement;
  onDeleteClick: (note: NoteModel) => void;
}

const Note = ({ note, form, onDeleteClick }: NoteProps) => {
  let createdUpdatedText: string;
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated ${formatDate(note.updatedAt)}`;
  } else {
    createdUpdatedText = `Created ${formatDate(note.createdAt)}`;
  }

  return (
    <div className="flex flex-col items-end gap-4">
      <Dialog>
        <button
          onClick={(e) => {
            onDeleteClick(note);
            e.preventDefault();
          }}>
          <Trash size={26} />
        </button>
        <DialogTrigger>
          <Card className="w-96 flex flex-col outline-primary hover:outline">
            <CardHeader>
              <CardTitle className="text-left break-words">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="break-words">{note.text}</p>
            </CardContent>
            <CardFooter>
              <p className="text-left text-muted-foreground">
                {createdUpdatedText}
              </p>
            </CardFooter>
          </Card>
        </DialogTrigger>
        {form}
      </Dialog>
    </div>
  );
};

export default Note;

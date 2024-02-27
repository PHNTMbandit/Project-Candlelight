import { formatDate } from "@/utils/formatDate";
import { Note as NoteModel } from "../models/note";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  let createdUpdatedText: string;
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated ${formatDate(note.updatedAt)}`;
  } else {
    createdUpdatedText = `Created ${formatDate(note.createdAt)}`;
  }

  return (
    <Card className="w-96 h-fit overflow-hidden outline-primary hover:outline">
      <CardHeader>
        <CardTitle className="hover:cursor-text">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="overflow-hidden hover:cursor-text">{note.text}</p>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <p className="text-muted-foreground">{createdUpdatedText}</p>
      </CardFooter>
    </Card>
  );
};

export default Note;

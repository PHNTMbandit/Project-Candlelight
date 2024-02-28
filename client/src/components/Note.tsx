import { formatDate } from "@/utils/formatDate";
import { Note as NoteModel } from "../models/note";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useState } from "react";
import { Trash } from "styled-icons/boxicons-regular";
import { Input } from "./ui/input";

interface NoteProps {
  note: NoteModel;
  onDeleteClick: (note: NoteModel) => void;
  onUpdateNote: (note: NoteModel) => void;
}

const Note = ({ note, onDeleteClick, onUpdateNote }: NoteProps) => {
  const [titleValue, setTitleValue] = useState(note.title);
  const [textValue, setTextValue] = useState(note.text);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmitChange = () => {
    if (note.title !== titleValue || note.text !== textValue) {
      note.title = titleValue;
      note.text = textValue;
      onUpdateNote(note);
    }
  };

  let createdUpdatedText: string;
  if (note.updatedAt > note.createdAt) {
    createdUpdatedText = `Updated ${formatDate(note.updatedAt)}`;
  } else {
    createdUpdatedText = `Created ${formatDate(note.createdAt)}`;
  }

  return (
    <div className="flex flex-col items-end gap-4">
      <button
        onClick={(e) => {
          onDeleteClick(note);
          e.preventDefault();
        }}>
        <Trash size={26} />
      </button>
      <div className="flex flex-col h-fit">
        <div className="w-96 flex flex-col border-2 rounded-lg outline-primary hover:outline">
          <Input
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
            onBlur={(e) => {
              handleTitleChange(e);
              handleSubmitChange();
            }}
            className="break-words border-none h-fit text-wrap"
          />
          <Input
            placeholder="Text"
            type="textarea"
            contentEditable="true"
            value={textValue}
            onChange={handleTextChange}
            onBlur={(e) => {
              handleTextChange(e);
              handleSubmitChange();
            }}
            className="break-words border-none max-w-full"
          />
          <p className="text-muted-foreground">{createdUpdatedText}</p>
        </div>
      </div>
    </div>
  );
};

export default Note;

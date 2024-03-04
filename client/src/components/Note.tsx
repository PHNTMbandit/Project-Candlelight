import { formatDate } from "@/utils/formatDate";
import { Note as NoteModel } from "../models/note";
import { useState } from "react";
import AutoExpandingTextArea from "./AutoExpandingTextArea";
import { Trash } from "styled-icons/boxicons-regular";

interface NoteProps {
  note: NoteModel;
  onDeleteClick: (note: NoteModel) => void;
  onUpdateNote: (note: NoteModel) => void;
}

const Note = ({ note, onDeleteClick, onUpdateNote }: NoteProps) => {
  const [titleValue, setTitleValue] = useState(note.title);
  const [textValue, setTextValue] = useState(note.text);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleValue(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="flex items-center group gap-3">
      <button
        className="invisible group-hover:visible"
        onClick={() => onDeleteClick(note)}>
        <Trash size={26} />
      </button>
      <div className="flex flex-col gap-4 group w-96 h-full p-4 border-2 rounded-lg outline-primary hover:outline">
        <AutoExpandingTextArea
          className="h4-medium"
          placeholder="Title"
          value={titleValue}
          onChange={handleTitleChange}
          onPointerLeave={handleSubmitChange}
        />
        <AutoExpandingTextArea
          className=""
          placeholder="Text"
          value={textValue}
          onChange={handleTextChange}
          onPointerLeave={handleSubmitChange}
        />
        <p className="text-xs text-muted-foreground mt-8">
          {createdUpdatedText}
        </p>
      </div>
    </div>
  );
};

export default Note;

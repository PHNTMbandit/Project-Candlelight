import { formatDate } from "@/utils/formatDate";
import { Note as NoteModel } from "../models/note";
import { useState } from "react";
import { Trash } from "styled-icons/boxicons-regular";
import AutoExpandingTextArea from "./AutoExpandingTextArea";

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
    <div className="flex flex-col items-end gap-4">
      <button
        onClick={(e) => {
          onDeleteClick(note);
          e.preventDefault();
        }}>
        <Trash size={26} />
      </button>
      <div className="w-96 flex flex-col p-4 gap-4 border-2 rounded-lg outline-primary hover:outline">
        <AutoExpandingTextArea
          className="h4-medium"
          placeholder="Title"
          value={titleValue}
          onChange={handleTitleChange}
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleTitleChange(e);
            handleSubmitChange();
          }}
        />
        <AutoExpandingTextArea
          className=""
          placeholder="Text"
          value={textValue}
          onChange={handleTextChange}
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleTextChange(e);
            handleSubmitChange();
          }}
        />
        <p className="text-xs text-muted-foreground mt-8">
          {createdUpdatedText}
        </p>
      </div>
    </div>
  );
};

export default Note;

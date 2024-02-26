import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../api/notes-api";

const NotesDashboard = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="flex gap-10">
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note}
        />
      ))}
    </div>
  );
};

export default NotesDashboard;

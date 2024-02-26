import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";

const NotesDashboard = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
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

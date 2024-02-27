import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../api/notes-api";
import AddNoteForm from "@/components/AddNoteForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { StickyNote } from "lucide-react";

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
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <StickyNote className="rounded hover:outline hover:outline-offset-4 hover:cursor-pointer" />
        </DialogTrigger>
        <AddNoteForm
          onFormSubmit={(newNote) => setNotes([...notes, newNote])}
        />
      </Dialog>

      {notes.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {notes.map((note, index) => (
            <Note
              key={index}
              note={note}
            />
          ))}
        </div>
      ) : (
        <p>No new notes</p>
      )}
    </div>
  );
};

export default NotesDashboard;

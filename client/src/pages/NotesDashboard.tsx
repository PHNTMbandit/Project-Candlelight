import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../api/notes-api";
import AddEditNoteForm from "@/components/AddEditNoteForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NoteSticky } from "@styled-icons/fa-regular/NoteSticky";

const NotesDashboard = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        console.log(notes);
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <NoteSticky
            size={26}
            className="rounded hover:outline hover:outline-offset-4 hover:cursor-pointer"
          />
        </DialogTrigger>
        <AddEditNoteForm
          onFormSubmit={(newNote) => setNotes([...notes, newNote])}
        />
      </Dialog>

      {notes.length > 0 ? (
        <div className="flex flex-wrap items-start gap-10">
          {notes.map((note, index) => (
            <Note
              key={index}
              note={note}
              onDeleteClick={deleteNote}
              form={
                <AddEditNoteForm
                  noteToEdit={note}
                  onFormSubmit={(updatedNote) => {
                    setNotes(
                      notes.map((existingNote) =>
                        existingNote._id === updatedNote._id
                          ? updatedNote
                          : existingNote
                      )
                    );
                  }}
                />
              }
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

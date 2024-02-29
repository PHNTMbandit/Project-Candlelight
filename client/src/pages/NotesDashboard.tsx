import Note from "@/components/Note";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../api/notes-api";
import { NoteSticky } from "@styled-icons/fa-regular/NoteSticky";
import { NoteInput } from "../api/notes-api";

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

  async function createNote(note: NoteInput) {
    try {
      const newNote = await NotesApi.createNote(note);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function updateNote(note: NoteModel) {
    try {
      await NotesApi.updateNote(note._id, note);
      setNotes(
        notes.map((existingNote) =>
          existingNote._id === note._id ? note : existingNote
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="space-y-4">
      <NoteSticky
        size={26}
        onClick={() => createNote({ title: "", text: "" })}
        className="rounded hover:outline hover:outline-offset-4 hover:cursor-pointer"
      />

      {/* {notes.length > 0 ? (
        <div className="flex flex-wrap items-start gap-10">
          {notes.map((note, index) => (
            <Note
              key={index}
              note={note}
              onDeleteClick={deleteNote}
              onUpdateNote={updateNote}
            />
          ))}
        </div>
      ) : (
        <p>No new notes</p>
      )} */}
    </div>
  );
};

export default NotesDashboard;

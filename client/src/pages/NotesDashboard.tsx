import Note from "@/components/Note";
import * as NotesApi from "../api/notes-api";
import * as UserApi from "../api/users-api";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import { NoteInput } from "../api/notes-api";
import { Add } from "@styled-icons/remix-line/Add";

const NotesDashboard = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        await UserApi.getLoggedInUser();
      } catch (error) {
        window.location.href = "/login";
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
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
      const index = notes.indexOf(note);
      setNotes(notes.splice(index, 1));
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
    <div className="space-y-6 p-6">
      <h1 className="h4-medium">Notes</h1>
      <div className="space-x-4">
        <button onClick={() => createNote({ title: "", text: "" })}>
          <Add size={32} />
        </button>
      </div>
      <div>
        {notes.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default NotesDashboard;

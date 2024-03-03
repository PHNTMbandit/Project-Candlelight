import * as NotesApi from "../api/notes-api";
import * as UserApi from "../api/users-api";
import { useEffect, useState } from "react";
import { Note as NoteModel } from "../models/note";
import { NoteInput } from "../api/notes-api";
import { Plus } from "styled-icons/boxicons-regular";

const TaskDashboard = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        await UserApi.getLoggedInUser();
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function loadTasks() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    loadTasks();
  }, []);

  async function createTask(note: NoteInput) {
    try {
      const newNote = await NotesApi.createNote(note);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function deleteTask(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function updateTask(note: NoteModel) {
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
      <h1 className="h4-medium">Tasks</h1>
      <div className="space-x-4">
        <button onClick={() => createTask({ title: "", text: "" })}>
          <Plus size={26} />
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default TaskDashboard;

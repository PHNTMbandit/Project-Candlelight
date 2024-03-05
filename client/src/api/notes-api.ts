import { Note } from "@/models/note";
import { fetchData } from "./api";

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    "https://project-candlelight-server.vercel.app/api/notes",
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    "https://project-candlelight-server.vercel.app/api/notes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    }
  );

  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(
    `https://project-candlelight-server.vercel.app/api/notes/${noteId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `https://project-candlelight-server.vercel.app/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      credentials: "include",
    }
  );
  return response.json();
}

'use client';

import NoteForm from "@/components/NoteForm";
import { useNotes } from "@/context/NotesContext";
import { useEffect } from "react";
import { Note } from "@prisma/client";
import NoteCard from "@/components/NoteCard";

function HomePage() {

  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 h-screen" /* flex items-center justify-center h-screen */>
      <div>
        <NoteForm />
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage

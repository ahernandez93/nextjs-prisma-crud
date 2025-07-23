'use client';

import { createContext, useState, useContext } from "react";
import { NoteFormData, UpdateNoteData } from "@/interfaces/Note";
import { Note } from "@prisma/client";

export type NotesContextType = {
    notes: Note[];
    loadNotes: () => Promise<void>;
    createNote: (note: NoteFormData) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
    updateNote: (id: number, note: UpdateNoteData) => Promise<void>;
};

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    loadNotes: async () => { },
    createNote: async () => { },
    deleteNote: async () => { },
    selectedNote: null,
    setSelectedNote: () => { },
    updateNote: async () => { }
});

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    async function loadNotes() {
        const response = await fetch('/api/notes');
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setNotes(data);
    }

    async function createNote(note: NoteFormData) {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('Failed to create note');
            return;
        }
        const newNote = await response.json();
        setNotes([...notes, newNote]);

    }

    async function deleteNote(id: number) {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error deleting note: ${errorData.message}`);
            return;
        }

        const deletedNote = await response.json();
        setNotes(notes.filter(note => note.id !== deletedNote.id));
    }

    async function updateNote(id: number, note: UpdateNoteData) {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            console.error('Failed to update note');
            return;
        }
        const updatedNote = await response.json();
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    }

    return (
        <NotesContext.Provider
            value={{
                notes,
                loadNotes,
                createNote,
                deleteNote,
                selectedNote,
                setSelectedNote,
                updateNote
            }}
        >
            {children}
        </NotesContext.Provider>
    );
}
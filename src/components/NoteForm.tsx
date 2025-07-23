'use client';

import { useState, useRef, useEffect } from "react"
import { useNotes } from "@/context/NotesContext";

export default function NoteForm() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const titleInputRef = useRef<HTMLInputElement>(null);

    const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content || '');
        }

    }, [selectedNote]);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!title || !content) return;

                if (selectedNote) {
                    await updateNote(selectedNote.id, { title, content });
                    setSelectedNote(null);
                } else {
                    await createNote({ title, content });
                }

                setTitle('');
                setContent('');
                titleInputRef.current?.focus();
            }}
        >
            <div>
                <label htmlFor="title" className="text-white">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter note title"
                    autoFocus
                    className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    ref={titleInputRef}
                />
            </div>
            <div>
                <label htmlFor="content" className="text-white">Content</label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Enter note content"
                    className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                ></textarea>
            </div>
            <div className="flex justify-end gap-x-2">
                <button
                    type="submit"
                    className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!title || !content}
                >
                    {selectedNote ? 'Update' : 'Create'}
                </button>
                {selectedNote && (
                    <button
                        type="button"
                        className="px-5 py-2 text-black bg-slate-400 rounded-md hover:bg-slate-500"
                        onClick={() => {
                            setSelectedNote(null);
                            setTitle('');
                            setContent('');
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

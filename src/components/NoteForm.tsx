'use client';

import { useState } from "react"
import { useNotes } from "@/context/NotesContext";

export default function NoteForm() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { createNote } = useNotes();

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!title || !content) return;

                await createNote({ title, content });
                setTitle('');
                setContent('');
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
                ></textarea>
            </div>
            <button
                type="submit"
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Create
            </button>

        </form>
    )
}

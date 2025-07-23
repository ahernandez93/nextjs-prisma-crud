import { Note } from "@prisma/client";
import { useNotes } from "@/context/NotesContext";
import { HiTrash, HiPencil } from "react-icons/hi";

export default function NoteCard({ note }: { note: Note }) {

    const { deleteNote, setSelectedNote } = useNotes();

    return (
        <div
            key={note.id}
            className="bg-slate-400 p-4 rounded-md my-2 flex justify-between"
        >
            <div>
                <h1 className="text-2xl font-bold">{note.title}</h1>
                <p>{note.content}</p>
                <p className="text-sm text-gray-600">Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-x-2">
                <button
                    // className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                        setSelectedNote(note)
                    }}
                >
                    <HiPencil className="text-2xl" />
                </button>
                <button
                    // className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-2"
                    onClick={async () => {
                        if (confirm(`Are you sure you want to delete note: ${note.id}?`)) {
                            await deleteNote(note.id);
                        }
                    }}
                >
                    <HiTrash className="text-2xl text-red-600" />
                </button>
            </div>
        </div>
    )
}

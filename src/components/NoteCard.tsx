import { Note } from "@/interfaces/Note"
import { useNotes } from "@/context/NotesContext";

export default function NoteCard({ note }: { note: Note }) {

    const { deleteNote } = useNotes();

    return (
        <div
            key={note.id}
            className="bg-slate-400 p-4 rounded-md my-2 flex justify-between"
        >
            <div>
                <h1 className="text-2xl font-bold">{note.title}</h1>
                <p>{note.content}</p>
            </div>
            <div className="flex gap-x-2">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => alert(`Editing note: ${note.id}`)}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-2"
                    onClick={async () => {
                        if (confirm(`Are you sure you want to delete note: ${note.id}?`)) {
                            await deleteNote(note.id);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

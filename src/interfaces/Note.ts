export type Note = {
    id: number;
    title: string;
    content: string;
}

export type NoteFormData = Omit<Note, 'id'>;


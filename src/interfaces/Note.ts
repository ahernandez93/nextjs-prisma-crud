import { Note } from "@prisma/client";

export type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateNoteData = Partial<NoteFormData>;


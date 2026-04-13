import { useEffect, useState } from "react";
import { notesService } from "@/lib/services/notes/notesService.ts";

export const useNote = (id: string): [note: string, setNote: (text: string) => void, deleteNote: () => void] => {
    const [note, internalSetNote] = useState(notesService.getNote(id));

    useEffect(() => notesService.observe(() => {
        internalSetNote(notesService.getNote(id));
    }), [id]);

    const setNote = (text: string) => {
        notesService.setNote(id, text);
    }

    const deleteNote = () => {
        notesService.deleteNote(id);
    }

    return [note, setNote, deleteNote];
}
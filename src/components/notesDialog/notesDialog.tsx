import {memo, type RefObject, useCallback, useEffect, useState} from "react";
import {useNote} from "@/lib/services/notes/useNote.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2Icon} from "lucide-react";

interface notesDialogProps {
    venueId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dialogContainer?: RefObject<HTMLDivElement | null>;
}

export const NotesDialog = memo(({venueId, open, onOpenChange, dialogContainer}: notesDialogProps) => {
    const [note, setNote, deleteNote] = useNote(venueId);
    const [draft, setDraft] = useState("");

    useEffect(() => {
        if (open) setDraft(note);
    }, [open]);

    const handleSave = useCallback(() => {
        setNote(draft);
        onOpenChange(false);
    }, [draft, setNote, onOpenChange]);

    const handleDelete = useCallback(() =>{
        deleteNote();
        onOpenChange(false);
    }, [deleteNote, onOpenChange]);

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent container={dialogContainer}>
                <DialogHeader>
                    <DialogTitle>Venue Note</DialogTitle>
                </DialogHeader>
                <Textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Write anything you want to remember about this venue!"
                    rows={6} />
                <DialogFooter>
                    <div className="flex justify-between w-full">
                        {note && (
                            <Button variant="destructive"
                                    size="icon"
                                    onClick={handleDelete}
                                    aria-label="Delete Note">
                                <Trash2Icon className="size-4" />
                            </Button>
                        )}
                        <div className="flex gap-2 ml-auto">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
})
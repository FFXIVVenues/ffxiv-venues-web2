import React, {memo, type RefObject, useCallback, useEffect, useState} from "react";
import {useNote} from "@/lib/services/notes/useNote.ts";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/shadcn/dialog.tsx";
import {Textarea} from "@/components/ui/shadcn/textarea.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Trash2Icon} from "lucide-react";
import { Trans, useLingui } from "@lingui/react/macro";

interface notesDialogProps {
    venueId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dialogContainer?: RefObject<HTMLDivElement | null>;
}

export const NotesDialog = memo(({venueId, open, onOpenChange, dialogContainer}: notesDialogProps) => {
    const [note, setNote, deleteNote] = useNote(venueId);
    const [draft, setDraft] = useState("");
    const { t } = useLingui();

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
            <DialogContent className="p-5" container={dialogContainer} showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-base leading-none font-bold"><Trans>Venue Note</Trans></DialogTitle>
                    <DialogDescription><Trans>Add a personal note for this venue.</Trans></DialogDescription>
                </DialogHeader>
                <Textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder={t`Write anything you want to remember about this venue!`}
                    rows={6} />
                <DialogFooter className="-m-5 mt-0 rounded-b-lg bg-muted/50 p-5 border-t flex justify-between!">
                    {note && (
                        <Button type="button"
                                variant="destructive"
                                className="p-4.5"
                                size="icon"
                                onClick={handleDelete}
                                aria-label={t`Delete Note`}>
                            <Trash2Icon className="size-4" />
                        </Button>
                    )}
                    <div className="flex gap-2 ml-auto">
                        <Button type="button" variant="outline" className="p-4.5" onClick={() => onOpenChange(false)}><Trans>Cancel</Trans></Button>
                        <Button type="button" className="p-4.5" onClick={handleSave}><Trans>Save</Trans></Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
})
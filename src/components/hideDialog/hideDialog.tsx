import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/shadcn/alert-dialog.tsx";
import React, {type RefObject} from "react";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Trans} from "@lingui/react/macro";


type HideDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    dialogContainer?: RefObject<HTMLDivElement | null>
};

export const HideDialog = ({ open, onOpenChange, onConfirm, dialogContainer }: HideDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="p-5" container={dialogContainer}>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base leading-none font-bold"><Trans>Hide this venue?</Trans></AlertDialogTitle>
                    <AlertDialogDescription className="pt-3">
                        <Trans>This venue will no longer appear in your results. You can unhide it by selecting show hidden venues from the settings page at any time.</Trans>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="-m-5 mt-0 rounded-b-lg bg-muted/50 p-5 border-t flex justify-between!">
                    <Button type="button" variant="outline" className="p-4.5" onClick={() => onOpenChange(false)}><Trans>Cancel</Trans></Button>
                    <Button type="button" variant="destructive" className="p-4.5" onClick={onConfirm}><Trans>Hide venue</Trans></Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        );
}
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import type {Venue} from "@/lib/model/venue.ts";

type VenueSheetProps = {
    venue: Venue,
    onClose: () => void;
}

export const VenueSheet = ({ onClose }: VenueSheetProps) => {
    return (
        <Sheet defaultOpen={true} onOpenChangeComplete={(open) => { if (!open) { onClose(); }}}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>This action cannot be undone.</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
import { memo, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VenueListItem } from "@/components/venueCard/venueListItem.tsx";
import { Table, TableBody } from "@/components/ui/table.tsx";
import { DateText } from "@/components/dateString/dateText.tsx";
import type { Venue } from "@/lib/model/venue.ts";
import type { ScheduleItemWithOpening } from "@/components/venueList/venueList.tsx";

type VenueListGroupProps = {
    date: Date;
    items: ScheduleItemWithOpening[];
    onVenueClick: (venue: Venue, newTab?: boolean) => void;
};

export const VenueListGroup = memo(({ date, items, onVenueClick }: VenueListGroupProps) => {
    const [open, setOpen] = useState(true);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 pl-5 cursor-pointer group">
                <ChevronRightIcon className={cn("h-3 w-3 transition-transform shrink-0 text-muted-foreground", open ? "rotate-90" : "rotate-0")} />
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <DateText date={date} />
                </h3>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="pl-9">
                    <Table className="w-full [&_td]:border-none [&_tr]:border-none">
                        <TableBody>
                            {items.map(({ venue, opening }) => (
                                <VenueListItem key={`${venue.id}-${opening.start}`} venue={venue} opening={opening} onClick={onVenueClick} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});
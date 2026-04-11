import React, { type ReactNode, memo } from "react";
import type { ScheduleItem } from "@/lib/services/venues/venueService";
import type { Venue } from "@/lib/model/venue.ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VenueListItem } from "@/components/venueCard/venueListItem.tsx";
import { Table, TableBody } from "@/components/ui/table.tsx";

type VenueListProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue, newTab?: boolean) => void;
    future?: boolean;
    className?: string;
};

export const VenueList = memo(({ title, venues, onVenueClick, future = false, className }: VenueListProps) => {
    const list = venues ?? [];
    if (list.length === 0) return null;
    const [open, setOpen] = React.useState(true);

    return (
        <Collapsible open={open} onOpenChange={setOpen} className={className}>
            <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 cursor-pointer">
                <ChevronRightIcon className={cn("h-4 w-4 transition-transform shrink-0", open ? "rotate-90" : "rotate-0")} />
                <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90">
                    {title}
                </h2>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="px-4 mt-2 mb-4">
                    <Table className="w-full [&_td]:border-none [&_tr]:border-none">
                        <TableBody>
                            {list.map(({ venue, opening }) => (
                                <VenueListItem key={`${venue.id}-${opening?.start ?? "x"}`} venue={venue} opening={opening} onClick={onVenueClick} future={future} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});
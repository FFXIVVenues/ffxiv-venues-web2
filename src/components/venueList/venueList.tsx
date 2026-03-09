import React, { type ReactNode } from "react";
import type { ScheduleItem } from "@/lib/services/venues/venueService";
import type { Venue } from "@/lib/model/venue.ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Table, TableBody } from "@/components/ui/table.tsx";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VenueCardList } from "@/components/venueCard/venueCardList.tsx";

type VenueListProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue) => void;
    future?: boolean;
};

export function VenueList({ title, venues, onVenueClick, future = false }: VenueListProps) {
    const list = venues ?? [];
    if (list.length === 0) return null;
    const [open, setOpen] = React.useState(true);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="ml-12 group flex w-full items-center gap-2 hover:text-accent cursor-pointer">
                <ChevronRightIcon className={cn("h-4 w-4 transition-transform", open ? "rotate-90" : "rotate-0")} />
                <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90 group-hover:text-accent">
                    {title}
                </h2>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="px-12 mt-2 mb-4">
                    <Table>
                        <TableBody>
                            {list.map(({ venue, opening }) => (
                                <VenueCardList key={`${venue.id}-${opening?.start ?? "x"}`} venue={venue} opening={opening} onClick={() => onVenueClick(venue)} future={future} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
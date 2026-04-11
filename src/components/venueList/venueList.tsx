import React, { type ReactNode, memo, useMemo, useState } from "react";
import type { ScheduleItem } from "@/lib/services/venues/venueService";
import type { Venue } from "@/lib/model/venue.ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VenueListItem } from "@/components/venueCard/venueListItem.tsx";
import { VenueListGroup } from "@/components/venueList/venueListGroup.tsx";
import { Table, TableBody } from "@/components/ui/table.tsx";
import type { Opening } from "@/lib/model/opening.ts";

type VenueListProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue, newTab?: boolean) => void;
    future?: boolean;
    className?: string;
};

export type ScheduleItemWithOpening = ScheduleItem & { opening: Opening };

function groupByDate(items: ScheduleItem[]): Map<string, ScheduleItemWithOpening[]> {
    const groups = new Map<string, ScheduleItemWithOpening[]>();
    const sorted = [...items].sort((a, b) => {
        if (!a.opening || !b.opening) return 0;
        return a.opening.start.getTime() - b.opening.start.getTime();
    });
    for (const item of sorted) {
        if (!item.opening) continue;
        const key = new Date(item.opening.start).toDateString();
        const group = groups.get(key) ?? [];
        group.push(item as ScheduleItemWithOpening);
        groups.set(key, group);
    }
    return groups;
}

export const VenueList = memo(({ title, venues, onVenueClick, future = false, className }: VenueListProps) => {
    const list = venues ?? [];
    if (list.length === 0) return null;

    const [open, setOpen] = useState(true);

    const grouped = useMemo(
        () => future ? groupByDate(list) : null,
        [list, future]
    );

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
                    {grouped
                        ? Array.from(grouped.entries()).map(([key, items]) => (
                            <VenueListGroup key={key} date={items[0]!.opening.start} items={items} onVenueClick={onVenueClick} />
                        )) : (
                            <div className="pl-5">
                                <Table className="w-full [&_td]:border-none [&_tr]:border-none">
                                    <TableBody>
                                        {list.map(({ venue, opening }) => (
                                            <VenueListItem key={`${venue.id}-${opening?.start ?? "x"}`} venue={venue} opening={opening} onClick={onVenueClick} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});
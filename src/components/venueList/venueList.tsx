import React, { type ReactNode, memo } from "react";
import type { ScheduleItem } from "@/lib/services/venues/venueService";
import type { Venue } from "@/lib/model/venue.ts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VenueListItem } from "@/components/venueCard/venueListItem.tsx";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import { DateText } from "@/components/dateString/dateText.tsx";
import type { Opening } from "@/lib/model/opening.ts";

type VenueListProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue, newTab?: boolean) => void;
    future?: boolean;
    className?: string;
};

type ScheduleItemWithOpening = ScheduleItem & { opening: Opening };

function groupByDate(items: ScheduleItem[]): Map<string, ScheduleItemWithOpening[]> {
    const groups = new Map<string, ScheduleItemWithOpening[]>();
    for (const item of items) {
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
    const [open, setOpen] = React.useState(true);

    const grouped = future ? groupByDate(list) : null;

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
                            {grouped
                                ? Array.from(grouped.entries()).map(([key, items]) => {
                                    const firstItem = items[0];
                                    if (!firstItem) return null;
                                    return (
                                        <React.Fragment key={key}>
                                            <TableRow className="border-none hover:bg-transparent">
                                                <TableCell colSpan={3} className="pb-1 pt-4 text-sm text-muted-foreground">
                                                    <DateText date={firstItem.opening.start} />
                                                </TableCell>
                                            </TableRow>
                                            {items.map(({ venue, opening }) => (
                                                <VenueListItem key={`${venue.id}-${opening?.start ?? "x"}`} venue={venue} opening={opening} onClick={onVenueClick} />
                                            ))}
                                        </React.Fragment>
                                    );
                                })
                                : list.map(({ venue, opening }) => (
                                    <VenueListItem key={`${venue.id}-${opening?.start ?? "x"}`} venue={venue} opening={opening} onClick={onVenueClick} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});
import type { Venue } from "@/lib/model/venue.ts";
import type { Opening } from "@/lib/model/opening.ts";
import { TimeText } from "@/components/dateString/timeText.tsx";
import { LocationText } from "@/components/locationText/locationText.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import { DateText } from "@/components/dateString/dateText.tsx";

type VenueCardListProps = {
    venue: Venue;
    opening?: Opening;
    onClick: (venue: Venue) => void;
    future?: boolean;
};

export function VenueListItem({ venue, opening, onClick, future = false }: VenueCardListProps) {
    const displayOpening = opening ?? venue.resolution;
    const isNew = venue.isNew();

    return (
        <TableBody className="group cursor-pointer"
                   aria-label={venue.name}
                   tabIndex={0}
                   onKeyDown={e => e.key === 'Enter' && onClick(venue)}
                   onClick={_ => onClick(venue)}>
        {displayOpening && !displayOpening.isNow && future && (
            <TableRow className="border-none hover:bg-transparent">
                <TableCell colSpan={3} className="sm:table-cell pb-0 pt-3 text-muted-foreground group-hover:bg-muted/50">
                    <DateText date={displayOpening.start} />
                </TableCell>
            </TableRow>
        )}

        <TableRow className="border-none hover:bg-transparent">
            {displayOpening && (
                <TableCell className="sm:table-cell w-px whitespace-nowrap text-muted-foreground tabular-nums pt-0 pb-0 sm:pb-4 group-hover:bg-muted/50">
                    {displayOpening?.isNow ? (
                        <span className="flex items-center gap-1">
                            <span className="hidden md:inline">Open until</span>
                            <TimeText time={displayOpening.end} />
                        </span>
                    ) : displayOpening && (
                        <span className="flex items-center gap-1">
                            <TimeText time={displayOpening.start} />
                            <span className="hidden md:inline">- <TimeText time={displayOpening.end} /></span>
                        </span>
                    )}
                </TableCell>
            )}

            <TableCell colSpan={displayOpening ? 1 : 2} className="sm:table-cell w-full max-w-0 font-semibold pt-0 pb-0 sm:pb-4 group-hover:bg-muted/50">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{venue.name}</span>
                    {isNew && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-green-500 border-green-500/30 bg-green-500/10 shrink-0">New</Badge>
                    )}
                </div>
            </TableCell>

            <TableCell className="hidden xl:table-cell text-muted-foreground pt-0 pb-0 sm:pb-4 group-hover:bg-muted/50">
                <LocationText location={venue.location} />
            </TableCell>
        </TableRow>
        </TableBody>
    );
}
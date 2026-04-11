import { type MouseEvent, memo, useCallback } from "react";
import type { Venue } from "@/lib/model/venue.ts";
import type { Opening } from "@/lib/model/opening.ts";
import { TimeText } from "@/components/dateString/timeText.tsx";
import { LocationText } from "@/components/locationText/locationText.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";

type VenueCardListProps = {
    venue: Venue;
    opening?: Opening;
    onClick: (venue: Venue, newTab?: boolean) => void;
};

export const VenueListItem = memo(({ venue, opening, onClick }: VenueCardListProps) => {
    const displayOpening = opening ?? venue.resolution;
    const isNew = venue.isNew();

    const onClickCallback = useCallback((e: MouseEvent) => {
        if (e.button === 0) onClick(venue, false);
    }, [onClick, venue]);

    const onMiddleMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, [onClick, venue]);

    const onMiddleClick = useCallback((e: MouseEvent) => {
        if (e.button !== 1) return;
        e.preventDefault();
        e.stopPropagation();
        onClick(venue, true);
    }, [onClick, venue]);

    return (
        <TableRow
            className="border-none hover:bg-muted/50 cursor-pointer group"
            aria-label={venue.name}
            tabIndex={0}
            onMouseDown={onMiddleMouseDown}
            onMouseUp={onMiddleClick}
            onClick={onClickCallback}
            onKeyDown={e => e.key === 'Enter' && onClick(venue)}
        >
            {displayOpening && (
                <TableCell className="w-[130px] whitespace-nowrap text-muted-foreground tabular-nums py-2.5">
                    {displayOpening.isNow ? (
                        <span className="flex items-center gap-1">
                            <span className="hidden md:inline">Open until</span>
                            <TimeText time={displayOpening.end} />
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                            <TimeText time={displayOpening.start} />
                            <span className="hidden md:inline">– <TimeText time={displayOpening.end} /></span>
                        </span>
                    )}
                </TableCell>
            )}

            <TableCell colSpan={displayOpening ? 1 : 2} className="w-full max-w-0 font-semibold py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{venue.name}</span>
                    {isNew && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-green-500 border-green-500/30 bg-green-500/10 shrink-0">New</Badge>
                    )}
                </div>
            </TableCell>

            <TableCell className="hidden xl:table-cell whitespace-nowrap text-right text-muted-foreground py-2.5">
                <LocationText location={venue.location} />
            </TableCell>
        </TableRow>
    );
});
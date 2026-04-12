import { type MouseEvent, memo, useCallback } from "react";
import type { Venue } from "@/lib/model/venue.ts";
import type { Opening } from "@/lib/model/opening.ts";
import { TimeText } from "@/components/dateString/timeText.tsx";
import { LocationText } from "@/components/locationText/locationText.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { DateText } from "@/components/dateString/dateText.tsx";

type VenueCardListProps = {
    venue: Venue;
    opening?: Opening;
    onClick: (venue: Venue, newTab?: boolean) => void;
    future?: boolean;
};

export const VenueListItem = memo(({ venue, opening, onClick, future = false }: VenueCardListProps) => {
    const displayOpening = opening ?? venue.resolution;

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
            onKeyDown={e => e.key === 'Enter' && onClick(venue)}>
            {displayOpening && (
                <TableCell className="w-[120px] sm:w-[120px] md:w-[280px] lg:w-[280px] whitespace-nowrap text-muted-foreground tabular-nums py-2.5">
                    {displayOpening.isNow ? (
                        <span className="flex items-center gap-1">
                            <span className="hidden md:inline">Open until</span>
                            <TimeText time={displayOpening.end} />
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                        {future && (
                            <>
                                <span className="inline md:hidden">
                                    <DateText date={displayOpening.start} short={true} />
                                </span>
                                <span className="hidden md:inline">
                                    <DateText date={displayOpening.start} />
                                </span>
                            </>
                        )}

                            <TimeText time={displayOpening.start} />
                            <span className="hidden md:inline">- <TimeText time={displayOpening.end} /></span>
                        </span>
                    )}
                </TableCell>
            )}

            <TableCell colSpan={displayOpening ? 1 : 2} className="sm:max-w-[100px] sm:w-100px md:max-w-[300px] md:w-[300px] font-semibold py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{venue.name}</span>
                </div>
            </TableCell>

            <TableCell className="w-full max-w-0 hidden xl:table-cell whitespace-nowrap text-left text-muted-foreground py-2.5">
                <LocationText location={venue.location} />
            </TableCell>
        </TableRow>
    );
});
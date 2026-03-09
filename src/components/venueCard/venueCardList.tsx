import type { Venue } from "@/lib/model/venue.ts";
import type { Opening } from "@/lib/model/opening.ts";
import { TimeText } from "@/components/dateString/timeText.tsx";
import { LocationText } from "@/components/locationText/locationText.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { DateText } from "@/components/dateString/dateText.tsx";

type VenueCardListProps = {
    venue: Venue;
    opening?: Opening;
    onClick: () => void;
    future?: boolean;
};

export function VenueCardList({ venue, opening, onClick, future = false }: VenueCardListProps) {
    const displayOpening = opening ?? venue.resolution;
    const isNew = venue.isNew();
    const isOpen = displayOpening?.isNow === true;
    const status = isOpen ? "Open" : isNew ? "New" : null;
    const statusColor = isOpen ? "text-fuchsia-500 border-fuchsia-500/30 bg-fuchsia-500/10" : isNew ? "text-green-500 border-green-500/30 bg-green-500/10" : "";

    return (
        <>
            {displayOpening && !displayOpening.isNow && future &&(
                <TableRow className="border-none hover:bg-transparent">
                    <TableCell colSpan={3} className="block sm:table-cell pb-0 pt-3 text-muted-foreground">
                        <DateText date={displayOpening.start} />
                    </TableCell>
                </TableRow>
            )}

            <TableRow onClick={onClick} className="cursor-pointer border-none">
                <TableCell className="block sm:table-cell w-44 text-muted-foreground tabular-nums whitespace-nowrap pt-0 pb-0 sm:pb-4">
                    {displayOpening?.isNow ? (
                        <span className="flex items-center gap-1">
                            <span>Open until</span>
                            <TimeText time={displayOpening.end} />
                        </span>
                    ) : displayOpening && (
                        <span className="flex items-center gap-1">
                            <TimeText time={displayOpening.start} />
                            <span>-</span>
                            <TimeText time={displayOpening.end} />
                        </span>
                    )}
                </TableCell>

                <TableCell className="block sm:table-cell font-semibold pt-0 pb-0 sm:pb-4">
                    <span className="flex items-center gap-2">
                        {venue.name}
                        {(isOpen || isNew) && (
                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${statusColor}`}>{status}</Badge>
                        )}
                    </span>
                </TableCell>

                <TableCell className="hidden lg:table-cell text-muted-foreground pt-0 pb-0 sm:pb-4">
                    <LocationText location={venue.location} />
                </TableCell>
            </TableRow>
        </>
    );
}
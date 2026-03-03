import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type { Venue } from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import type {Opening} from "@/lib/model/opening.ts";

type VenueCardProps = {
    venue: Venue;
    opening?: Opening;
}

export function VenueCard({ venue, opening }: VenueCardProps) {
    const displayOpening = opening ?? venue.resolution;

    const isOpen = displayOpening?.isNow === true;
    const isNew  = venue.isNew();
    const status = isOpen ? "Open" : isNew ? "New" : null;
    const pingOuter = isOpen ? "bg-fuchsia-500" : isNew ? "bg-green-500" : "";
    const pingInner = isOpen ? "bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.75)]" : isNew ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.75)]" : "";

    return (
        <Card className="rounded-xl overflow-hidden py-0 h-full flex flex-col">
            <div className="relative w-full aspect-2/1 overflow-hidden rounded-t-xl">
                <img
                    src={venue.bannerUri ?? "../assets/default-banner.webp"}
                    alt={venue.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            </div>

            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg leading-tight line-clamp-1">{venue.name}</CardTitle>
                    {(isOpen || isNew) && (
                        <Badge variant="secondary" className="relative pr-6 shrink-0 mt-0.5">
                            {status}
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-1.5 w-1.5">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pingOuter} opacity-75`} />
                                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pingInner}`} />
                            </span>
                        </Badge>
                    )}
                </div>
                <CardDescription className="text-sm">
                    {displayOpening?.isNow? (
                        <span className="flex items-center gap-1">
                            <span className="text-muted-foreground">Open until</span>
                            <TimeText date={displayOpening.end} />
                        </span>
                    ): displayOpening && (
                         <span className="flex items-center gap-1">
                             <DateText date={displayOpening.start} />
                             <TimeText date={displayOpening.start} />
                             <span className="text-muted-foreground">-</span>
                             <TimeText date={displayOpening.end} />
                         </span>
                    )
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {venue.tags && venue.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                        {venue.tags.slice(0,2).map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-muted text-muted-foreground border-muted whitespace-nowrap rounded-sm">
                                {tag}
                            </Badge>
                        ))}

                        {venue.tags.length > 2 && (
                            <Tooltip>
                                <TooltipTrigger>
                                    <Badge variant="outline" className="bg-muted text-muted-foreground border-muted whitespace-nowrap rounded-sm">+{venue.tags.length - 2} more</Badge>
                                </TooltipTrigger>

                                <TooltipContent className="rounded-md border bg-popover text-popover-foreground shadow-md px-3 py-2 text-xs max-w-65">
                                    <div className="flex flex-wrap gap-1">
                                        {venue.tags.slice(2).map((tag) => (
                                            <span key={tag} className="rounded-sm bg-muted px-1.5 py-0.5 text-muted-foreground">{tag}</span>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pb-6 border-t">
                <Button className="w-full">View Venue</Button>
            </CardFooter>
        </Card>
    );
}
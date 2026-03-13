import {memo} from "react";
import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import type { Venue } from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import type {Opening} from "@/lib/model/opening.ts";
import defaultBanner from "@/assets/default-banner.webp";
import {CheckIcon, HeartIcon, StarIcon} from "lucide-react";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";

type VenueCardProps = {
    venue: Venue;
    opening?: Opening;
    onClick: () => void;
}

export const VenueCard = memo(({ venue, opening, onClick }: VenueCardProps) => {
    const displayOpening = opening ?? venue.resolution;
    const isOpen = displayOpening?.isNow === true;
    const isVisited = visitedService.isVisited(venue.id);
    const isFavorite = favouritesService.isFavourite(venue.id);
    const isNew  = venue.isNew();
    const status = isOpen ? "Open" : isNew ? "New" : null;
    const pingOuter = isOpen ? "bg-accent" : isNew ? "bg-green-500" : "";
    const pingInner = isOpen ? "bg-accent shadow-[0_0_10px_rgba(232,121,249,0.75)]" : isNew ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.75)]" : "";

    return (
        <Card className="p-0 h-full flex flex-col max-w-[400px]">
            <img src={venue.bannerUri ?? defaultBanner} alt={venue.name} loading="lazy" className="aspect-2/1"/>

            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="leading-tight line-clamp-1">{venue.name}</CardTitle>
                    {(isOpen || isNew) && (
                        <Badge variant="secondary" className="relative pr-6 -mt-0.5">
                            {status}
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-1.5 w-1.5">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pingOuter} opacity-75`} />
                                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pingInner}`} />
                            </span>
                        </Badge>
                    )}
                </div>
                <CardDescription className="min-h-6 flex justify-between">
                  {displayOpening?.isNow ? (
                      <span className="flex items-center gap-1">
                          <span className="text-muted-foreground">Open until</span>
                          <TimeText time={displayOpening.end} />
                      </span>
                  ) : displayOpening && (
                      <span className="flex items-center gap-1">
                          <DateText date={displayOpening.start} />
                          <TimeText time={displayOpening.start} />
                          <span className="hidden md:inline">- <TimeText time={displayOpening.end} /></span>
                      </span>
                  )}
                  <div className="flex gap-2">
                    { rating > 0 && <span className="flex gap-0.5 text-xs font-bold text-muted-foreground">{rating}<StarIcon size={14} fill="currentColor" /></span>}
                    { isVisited && <CheckIcon size={16} className="mr-1 text-muted-foreground  " /> }
                    { isFavorite && <HeartIcon size={14} className="mr-1 stroke-muted-foreground fill-muted-foreground" /> }
                  </div>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex items-center gap-2 overflow-hidden flex-1" style={{ maskImage: "linear-gradient(to right, black 70%, transparent 100%)" }}>
                        {venue.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-muted text-muted-foreground border-muted rounded-sm shrink-0">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pb-6 border-t">
                <Button className="w-full cursor-pointer" onClick={onClick}>View Venue</Button>
            </CardFooter>
        </Card>
    );
});
import {memo, type MouseEvent, useCallback} from 'react';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import defaultBanner from "@/assets/default-banner.webp";
import type {Venue} from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import type {Opening} from "@/lib/model/opening.ts";
import {CheckIcon, HeartIcon, StarIcon} from "lucide-react";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {ratingsService} from "@/lib/services/ratingsService.ts";
import {Lazy} from "@/components/ui/lazy.tsx";
import {cn} from "@/lib/utils";
import {PulseBadge} from "@/components/pulseBadge/pulseBadge.tsx";

type VenueCardProps = {
    venue: Venue;
    opening?: Opening;
    onClick: (venue: Venue, newTab?: boolean) => void;
}

export const VenueCardCompact = memo(({ venue, opening, onClick }: VenueCardProps) => {
    const displayOpening = opening ?? venue.resolution;
    const rating = ratingsService.getRating(venue.id);
    const isFavorite = favouritesService.isFavourite(venue.id);
    const isVisited = visitedService.isVisited(venue.id);
    const isOpen = displayOpening?.isNow === true;
    const isNew  = venue.isNew();
    const status = isOpen ? "Open" : isNew ? "New" : null;

    const badgeBg = isOpen ? "bg-accent" : isNew ? "bg-green-700" : "";

    const onClickCallback = useCallback((e: MouseEvent) => {
        if (e.button === 0) onClick(venue, false);
    }, [onClick, venue]);

    const onMiddleMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, [onClick, venue]);

    const onMiddleClick = useCallback((e: MouseEvent) => {
        if (e.button !== 1)
            return;
        e.preventDefault();
        e.stopPropagation();
        onClick(venue, true);
    }, [onClick, venue]);

    return (
      <div className="w-[350px]">
          <Lazy className="w-full aspect-3/2">
            <Card className="py-5 cursor-pointer hover:bg-muted/50 transition-colors gap-5 w-full"
                  aria-label={venue.name}
                  tabIndex={0}
                  onMouseDown={onMiddleMouseDown}
                  onClick={onClickCallback} 
                  onMouseUp={onMiddleClick}>
                <img src={venue.bannerUri ?? defaultBanner} alt={venue.name} loading="lazy" className="aspect-2/1"/>
                <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="leading-tight line-clamp-1">{venue.name}</CardTitle>
                        {(isOpen || isNew) &&
                          <PulseBadge className={cn("shadow", badgeBg)}>{status}</PulseBadge>
                        }
                    </div>
                    <CardDescription className="min-h-4 flex justify-between">
                        {displayOpening?.isNow? (
                            <span className="flex items-center gap-1 font-bold">
                                <span>Open until</span>
                                <TimeText time={displayOpening.end} />
                            </span>
                        ): displayOpening && (
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
            </Card>
        </Lazy>
      </div>
    );
});


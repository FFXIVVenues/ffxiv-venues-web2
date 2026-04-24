import React, {memo, useCallback, type MouseEvent} from "react";
import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import type { Venue } from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import type {Opening} from "@/lib/model/opening.ts";
import defaultBanner from "@/assets/default-banner.webp";
import {CheckIcon, EyeOffIcon, HeartIcon, Pencil, StarIcon} from "lucide-react";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {ratingsService} from "@/lib/services/ratingsService.ts";
import {Lazy} from "@/components/ui/lazy.tsx";
import {notesService} from "@/lib/services/notes/notesService.ts";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {LocationText} from "@/components/locationText/locationText.tsx";
import {NewBadge} from "@/components/badges/newBadge.tsx";
import {OpenBadge} from "@/components/badges/openBadge.tsx";
import {hideService} from "@/lib/services/hideVenue/hideService.ts";

type VenueCardProps = {
    venue: Venue;
    opening?: Opening;
    onClick: (venue: Venue, newTab?: boolean) => void;
}

export const VenueCardFull = memo(({ venue, opening, onClick }: VenueCardProps) => {
    const displayOpening = opening ?? venue.resolution;
    const isOpen = displayOpening?.isNow === true;
    const rating = ratingsService.getRating(venue.id);
    const isVisited = visitedService.isVisited(venue.id);
    const isFavorite = favouritesService.isFavourite(venue.id);
    const hasNote = notesService.hasNote(venue.id);
    const isHidden = hideService.isHidden(venue.id);
    const isNew  = venue.isNew();

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
      <div className="w-[375px]">
        <Lazy className="w-full aspect-3/2">
          <Card className="p-0 h-full flex flex-col w-full">
              <img src={venue.bannerUri ?? defaultBanner} alt={venue.name} loading="lazy" className="aspect-2/1"/>
              <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                      <CardTitle className="leading-tight line-clamp-1">{venue.name}</CardTitle>
                      {isOpen ? <NewBadge /> : isNew ? <OpenBadge /> : null}
                  </div>
                  <CardDescription>
                    <div className="min-h-6 flex justify-between">
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
                      <div className="flex gap-2 items-center">
                          { rating > 0 && <span className="flex gap-0.5 text-xs font-bold text-muted-foreground">{rating}<StarIcon size={14} fill="currentColor" /></span>}
                          { isVisited && <CheckIcon size={16} className="mr-1 text-muted-foreground  " /> }
                          { isFavorite && <HeartIcon size={14} className="mr-1 stroke-muted-foreground fill-muted-foreground" /> }
                          {hasNote && (
                              <HoverCard>
                                  <HoverCardTrigger>
                                      <Pencil size={14} className="stroke-muted-foreground fill-muted-foreground" />
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-64">
                                      <p className="text-xs font-semibold text-muted-foreground mb-1">Note</p>
                                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notesService.getNote(venue.id)}</p>
                                  </HoverCardContent>
                              </HoverCard>
                          )}
                          { isHidden && <EyeOffIcon size={14} className="mr-1 stroke-muted-foreground fill-muted-foreground" /> }
                      </div>
                    </div>
                    <LocationText className="line-clamp-1" location={venue.location} />
                  </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">

                <div className="flex items-center gap-2 pt-0.5 min-h-[22px]">
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
                  <Button className="w-full cursor-pointer" onMouseDown={onMiddleMouseDown} onClick={onClickCallback} onMouseUp={onMiddleClick}>View Venue</Button>
              </CardFooter>
          </Card>
        </Lazy>
      </div>
    );
});
